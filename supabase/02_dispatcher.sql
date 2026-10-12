-- EVAGO: панель диспетчера + ссылка водителя + живая геолокация водителя.
-- Если Claude не смог применить сам: Supabase → SQL Editor → вставить всё → Run.
create table if not exists public.admins (email text primary key);
alter table public.admins enable row level security;
insert into public.admins(email) values ('erimovasim@gmail.com') on conflict do nothing;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where lower(email) = lower(coalesce(auth.jwt()->>'email','')));
$$;
drop policy if exists "admins read self" on public.admins;
create policy "admins read self" on public.admins for select to authenticated using (public.is_admin());
alter table public.orders add column if not exists driver_token uuid;
alter table public.orders add column if not exists driver_lat double precision;
alter table public.orders add column if not exists driver_lng double precision;
alter table public.orders add column if not exists driver_seen_at timestamptz;
alter table public.orders add column if not exists admin_note text;
drop policy if exists "admin select orders" on public.orders;
drop policy if exists "admin update orders" on public.orders;
drop policy if exists "admin select apps" on public.driver_applications;
drop policy if exists "admin update apps" on public.driver_applications;
create policy "admin select orders" on public.orders for select to authenticated using (public.is_admin());
create policy "admin update orders" on public.orders for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "admin select apps" on public.driver_applications for select to authenticated using (public.is_admin());
create policy "admin update apps" on public.driver_applications for update to authenticated using (public.is_admin()) with check (public.is_admin());
create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders for each row execute function public.touch_updated_at();
drop function if exists public.get_order(uuid);
create function public.get_order(p_id uuid)
returns table(id uuid, created_at timestamptz, service text, car_type text, from_address text, from_lat double precision, from_lng double precision,
  to_address text, to_lat double precision, to_lng double precision, distance_km numeric, price_est integer, status text,
  driver_name text, driver_phone text, driver_car text, eta_min integer, final_price integer, rating smallint,
  driver_lat double precision, driver_lng double precision, driver_seen_at timestamptz)
language sql stable security definer set search_path = public as $$
  select o.id, o.created_at, o.service, o.car_type, o.from_address, o.from_lat, o.from_lng, o.to_address, o.to_lat, o.to_lng,
    o.distance_km, o.price_est, o.status, o.driver_name, o.driver_phone, o.driver_car, o.eta_min, o.final_price, o.rating,
    case when o.status in ('accepted','onway','arrived') then o.driver_lat end,
    case when o.status in ('accepted','onway','arrived') then o.driver_lng end,
    o.driver_seen_at
  from orders o where o.id = p_id;
$$;
create or replace function public.driver_get_order(p_id uuid, p_token uuid)
returns table(id uuid, created_at timestamptz, service text, car_type text, from_address text, from_lat double precision, from_lng double precision,
  to_address text, to_lat double precision, to_lng double precision, distance_km numeric, price_est integer, final_price integer, status text,
  client_name text, phone text, comment text, driver_name text)
language sql stable security definer set search_path = public as $$
  select o.id, o.created_at, o.service, o.car_type, o.from_address, o.from_lat, o.from_lng, o.to_address, o.to_lat, o.to_lng,
    o.distance_km, o.price_est, o.final_price, o.status, o.client_name, o.phone, o.comment, o.driver_name
  from orders o where o.id = p_id and o.driver_token is not null and o.driver_token = p_token;
$$;
create or replace function public.driver_ping(p_id uuid, p_token uuid, p_lat double precision, p_lng double precision)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if p_lat not between -90 and 90 or p_lng not between -180 and 180 then return false; end if;
  update orders set driver_lat = p_lat, driver_lng = p_lng, driver_seen_at = now()
   where id = p_id and driver_token = p_token and status in ('accepted','onway','arrived');
  return found;
end $$;
create or replace function public.driver_set_status(p_id uuid, p_token uuid, p_status text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if p_status not in ('onway','arrived','done') then return false; end if;
  update orders set status = p_status where id = p_id and driver_token = p_token and status in ('accepted','onway','arrived');
  return found;
end $$;
revoke all on function public.driver_get_order(uuid,uuid), public.driver_ping(uuid,uuid,double precision,double precision), public.driver_set_status(uuid,uuid,text), public.get_order(uuid) from public;
grant execute on function public.driver_get_order(uuid,uuid), public.driver_ping(uuid,uuid,double precision,double precision), public.driver_set_status(uuid,uuid,text), public.get_order(uuid) to anon, authenticated;
grant execute on function public.is_admin() to authenticated;
grant select, update on public.orders, public.driver_applications to authenticated;
grant select on public.admins to authenticated;
do $$ begin alter publication supabase_realtime add table public.orders; exception when duplicate_object then null; end $$;
do $$ begin alter publication supabase_realtime add table public.driver_applications; exception when duplicate_object then null; end $$;
