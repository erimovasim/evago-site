-- EVAGO: фото к заказу (до 3 шт.) + новые цены услуг.
-- Supabase → SQL Editor → вставить всё → Run.

-- Хранилище фото: только картинки, до 5 МБ, имена файлов случайные
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('order-photos', 'order-photos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "evago clients upload order photos" on storage.objects;
create policy "evago clients upload order photos" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'order-photos' and name ~ '^[0-9a-f-]{36}\.jpg$');

-- Ссылки на фото в заказе
alter table public.orders add column if not exists photos text[];
alter table public.orders drop constraint if exists orders_photos_max;
alter table public.orders add constraint orders_photos_max check (photos is null or array_length(photos, 1) <= 3);

-- Создание заказа: теперь с фото
drop function if exists public.create_order(text, text, text, double precision, double precision, text, double precision, double precision, numeric, integer, text, text, text, text);
drop function if exists public.create_order(text, text, text, double precision, double precision, text, double precision, double precision, numeric, integer, text, text, text, text, text[]);
create function public.create_order(p_service text, p_car_type text, p_from_address text, p_from_lat double precision, p_from_lng double precision,
  p_to_address text, p_to_lat double precision, p_to_lng double precision, p_distance_km numeric, p_price_est integer,
  p_client_name text, p_phone text, p_comment text, p_lang text, p_photos text[] default null)
returns uuid language plpgsql security definer set search_path = public as $$
declare v_id uuid; v_photos text[];
begin
  if (select count(*) from orders where phone = p_phone and created_at > now() - interval '10 minutes') >= 3 then
    raise exception 'too_many_orders';
  end if;
  -- принимаем только ссылки на наше хранилище
  select array_agg(x) into v_photos from unnest(coalesce(p_photos, '{}')) x
   where x ~ '^https://nufjmjqjpsqxvtjafxud\.supabase\.co/storage/v1/object/public/order-photos/[0-9a-f-]{36}\.jpg$';
  insert into orders(service, car_type, from_address, from_lat, from_lng, to_address, to_lat, to_lng,
    distance_km, price_est, client_name, phone, comment, lang, photos)
  values (p_service, p_car_type, trim(p_from_address), p_from_lat, p_from_lng, nullif(trim(p_to_address),''), p_to_lat, p_to_lng,
    p_distance_km, p_price_est, nullif(trim(p_client_name),''), p_phone, nullif(trim(p_comment),''), coalesce(p_lang,'kz'), v_photos[1:3])
  returning id into v_id;
  return v_id;
end $$;
revoke all on function public.create_order(text, text, text, double precision, double precision, text, double precision, double precision, numeric, integer, text, text, text, text, text[]) from public;
grant execute on function public.create_order(text, text, text, double precision, double precision, text, double precision, double precision, numeric, integer, text, text, text, text, text[]) to anon, authenticated;

-- Водителю тоже видно фото
drop function if exists public.driver_get_order(uuid, uuid);
create function public.driver_get_order(p_id uuid, p_token uuid)
returns table(id uuid, created_at timestamptz, service text, car_type text, from_address text, from_lat double precision, from_lng double precision,
  to_address text, to_lat double precision, to_lng double precision, distance_km numeric, price_est integer, final_price integer, status text,
  client_name text, phone text, comment text, driver_name text, photos text[])
language sql stable security definer set search_path = public as $$
  select o.id, o.created_at, o.service, o.car_type, o.from_address, o.from_lat, o.from_lng, o.to_address, o.to_lat, o.to_lng,
    o.distance_km, o.price_est, o.final_price, o.status, o.client_name, o.phone, o.comment, o.driver_name, o.photos
  from orders o where o.id = p_id and o.driver_token is not null and o.driver_token = p_token;
$$;
revoke all on function public.driver_get_order(uuid, uuid) from public;
grant execute on function public.driver_get_order(uuid, uuid) to anon, authenticated;
