/* =====================================================================
   EVAGO — общий код сайта (настройки, языки, шапка, подвал, база)
   ===================================================================== */

/* ===== НАСТРОЙКИ — меняй только здесь ===== */
const EVAGO = {
  // База заказов (Supabase). Ключ публичный — так и должно быть.
  supabaseUrl: "https://nufjmjqjpsqxvtjafxud.supabase.co",
  supabaseKey: "sb_publishable_MbzxcCvlznIyncBDYPKwIA_5IqnaGZA",

  // Контакты. Пока пусто — на сайте не показываются. Впиши настоящие:
  phone: "+7 707 271 40 75",
  whatsapp: "77072714075",   // на этот WhatsApp приходят все заказы
  instagram: "",    // пример: "evago.kz"

  city: { kz: "Алматы", ru: "Алматы" },
  center: [43.2389, 76.8897],   // центр карты (Алматы)
  // Откуда выезжает помощь (для аккумулятора, колеса, топлива цена зависит от расстояния отсюда до клиента)
  base: [43.2389, 76.8897],

  // Тарифы эвакуатора, ₸: base — подача, km — за 1 км (ПРИМЕРНЫЕ, замени)
  cars: [
    { id: "sedan", kz: "Жеңіл көлік",  ru: "Легковой",     base: 10000, km: 350 },
    { id: "cross", kz: "Кроссовер",    ru: "Кроссовер",    base: 12000, km: 400 },
    { id: "van",   kz: "Микроавтобус", ru: "Микроавтобус", base: 15000, km: 450 },
    { id: "moto",  kz: "Мотоцикл",     ru: "Мотоцикл",     base: 8000,  km: 300 },
    { id: "truck", kz: "Жүк көлігі",   ru: "Грузовой",     base: 25000, km: 600 }
  ],
  // Выездные услуги, ₸: base — минимальная цена, km — за каждый км от базы до клиента (ПРИМЕРНЫЕ, замени)
  services: [
    { id: "tow",     kz: ["Эвакуатор", "Кез келген көлікті тасымалдау"],          ru: ["Эвакуатор", "Перевозка любого авто"] },
    { id: "battery", kz: ["Аккумулятор зарядтау", "Аккумуляторды орнында зарядтау"], ru: ["Зарядка аккумулятора", "Зарядим аккумулятор на месте"], base: 2000, km: 100 },
    { id: "tire",    kz: ["Дөңгелек ауыстыру", "Жолда дөңгелек ауыстыру"],         ru: ["Замена колеса", "Замена колеса на дороге"], base: 3000, km: 100 },
    { id: "fuel",    kz: ["Жанармай жеткізу", "Жанармай құны бөлек төленеді"],    ru: ["Доставка топлива", "Топливо оплачивается отдельно"], base: 2000, km: 100 }
  ]
};
/* ========================================== */

const ICONS = {
  car: '<path d="M3 17v-4.5L5.5 7h13L21 12.5V17"/><path d="M3 17h18M6 17v2.5M18 17v2.5M3 12.5h18"/><circle cx="7.5" cy="14.8" r="1"/><circle cx="16.5" cy="14.8" r="1"/>',
  tow: '<path d="M2 15V9h9l3 3h6a2 2 0 0 1 2 2v1"/><circle cx="7" cy="16" r="2"/><circle cx="18" cy="16" r="2"/><path d="M9 16h7"/>',
  battery: '<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V5M17 7V5M7 13h3M15.5 11.5v3M14 13h3"/>',
  tire: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v5M12 16v5M3 12h5M16 12h5"/>',
  fuel: '<path d="M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 21h13M7 7h5v4H7zM15 9h2l2 2v6a1.5 1.5 0 0 0 3 0V8l-3-3"/>',
  unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3M12 15v2"/>',
  tech: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>'
};

/* ===== Тексты KZ / RU ===== */
const I18N = {
  kz: {
    nav_home: "Басты бет", nav_services: "Қызметтер", nav_tariffs: "Тарифтер", nav_drivers: "Жүргізушілерге", nav_contact: "Байланыс",
    call: "Эвакуатор шақыру", menu: "Мәзір",
    badge: "Алматыда тәулік бойы жұмыс істейміз",
    h1a: "Жолда жалғыз", h1b: "емессің.",
    lead: "EVAGO — жолдағы сенімді көмек. Орныңызды картадан белгілеңіз, бағаны алдын ала көріңіз, эвакуатор жолға шығады.",
    about_services: "Көмек түрлері",
    st1: "тәулік бойы", st2: "көмек түрі", st3: "көлік түрі",
    from: "Қайдан?", to: "Қайда?", addr_ph: "Мекенжайды енгізіңіз", car: "Көлік түрі",
    svc_eyebrow: "Қызметтер", svc_h: "Жолда болатын кез келген жағдайға көмек", svc_p: "Біз тек эвакуатор емес — жолдағы сенімді серігіңізбіз.",
    from_price: "бастап",
    how_e: "Қалай жұмыс істейді", how_h: "Шақырудан келуге дейін 4 қадам",
    s1h: "Орныңызды белгілеңіз", s1p: "Карта орналасқан жеріңізді өзі анықтайды. Қайда апару керектігін көрсетіңіз.",
    s2h: "Бағаны көріңіз", s2p: "Көлік түрін таңдаңыз — қашықтық пен болжамды баға бірден есептеледі.",
    s3h: "Тапсырыс беріңіз", s3p: "Нөміріңізді қалдырыңыз. Диспетчер жақын жүргізушіні тауып, хабарласады.",
    s4h: "Күйін бақылаңыз", s4p: "Тапсырыс бетінде жүргізуші кім екенін және қашан келетінін көресіз.",
    tar_h: "Ашық бағалар", tar_h2: "Эвакуатор бағалары", tow_of: "Эвакуатор:", call_help: "Көмек шақыру", tar_p: "Эвакуатор: шақыру + әр километр. Басқа қызметтер: ең аз баға + сізге дейінгі қашықтық.",
    th_car: "Көлік түрі", th_base: "Шақыру", th_km: "1 км", th_ex: "Мысалы, 10 км",
    th_svc: "Қызмет", th_price: "Бағасы", th_min: "Ең аз баға", th_perkm: "1 км",
    tnote: "Бағалар болжамды. Нақты бағаны жүргізуші шыққанға дейін растайды. Төлем — қолма-қол немесе аударым.",
    drv_eyebrow: "Жүргізушілерге", drv_h: "Эвакуаторыңыз бар ма? EVAGO-мен жұмыс істеңіз",
    d1: "Тапсырыстар өзіңізге жақын жерден", d2: "Қашан жұмыс істейтініңізді өзіңіз таңдайсыз", d3: "Табыс тапсырыс аяқталған соң бірден",
    drv_btn: "Өтінім қалдыру",
    app_h: "Көмек — бір батырма қашықтықта.", app_p: "EVAGO қосымшасы әзірленуде. Әзірге тапсырысты осы сайт арқылы беріңіз — бәрі телефоннан да жұмыс істейді.",
    p1: "Жылдам", p1d: "Тапсырыс бір минутта рәсімделеді", p2: "Сенімді", p2d: "Тексерілген жүргізушілер", p3: "Қолайлы", p3d: "Баға алдын ала белгілі",
    soon: "Жақында",
    contact_h: "Байланыс", cb_h: "Сұрағыңыз бар ма? Жазыңыз", cb_p: "WhatsApp-қа жазыңыз немесе қоңырау шалыңыз — тәулік бойы жауап береміз.", wa_hello: "Сәлеметсіз бе! EVAGO сайтынан жазып отырмын.", contact_order: "Тапсырысты сайт арқылы беріңіз — диспетчер сізге өзі хабарласады.",
    copy: "Көшіру", copied: "Көшірілді", rights: "Барлық құқықтар қорғалған", slogan: "Жолда сенімді көмек әрқашан жақында.",
    qo_note: "Келесі бетте «Мен осындамын» батырмасымен орныңызды бір басумен көрсетесіз",
    active_order: "Сізде белсенді тапсырыс бар", open: "Ашу",
    sos: "SOS",
    // order page
    o_title: "Тапсырыс беру", o_back: "Артқа", o_service: "Не болды?", o_where: "Сіз қайдасыз?",
    o_locating: "Орныңыз анықталуда…", o_loc_denied: "Геолокацияға рұқсат жоқ. Мекенжайды жазыңыз немесе картаны басыңыз.",
    o_loc_btn: "Менің орным", o_tap_from: "Картаны басып «Қайдан» нүктесін қойыңыз", o_tap_to: "Картаны басып «Қайда» нүктесін қойыңыз",
    o_distance: "Қашықтық", o_time: "Жолда", o_price: "Болжамды баға", o_min: "мин", o_km: "км",
    o_next: "Жалғастыру", o_need_from: "«Қайдан» мекенжайын көрсетіңіз", o_need_to: "«Қайда» мекенжайын көрсетіңіз",
    o_details: "Қосымша ақпарат", o_problem: "Не болды? (міндетті емес)",
    pr1: "Көлік оталмайды", pr2: "Жол апаты", pr3: "Двигатель бұзылды", pr4: "Кюветте", pr5: "Дөңгелегі жарылды", pr6: "Басқа",
    o_comment: "Түсініктеме", o_comment_ph: "Мысалы: көліктің маркасы, түсі, белгілер", o_name: "Атыңыз", o_name_ph: "Атыңыз",
    o_phone: "Телефон нөміріңіз", o_phone_err: "Телефон нөмірін толық енгізіңіз: +7 және 10 сан",
    o_send: "Эвакуатор шақыру", o_sending: "Жіберілуде…", o_send_err: "Тапсырыс жіберілмеді. Интернетті тексеріп, қайта басыңыз.",
    o_too_many: "Тым көп тапсырыс. 10 минуттан кейін қайталаңыз.",
    o_summary: "Тапсырыс", o_agree: "Батырманы басқанда WhatsApp ашылады — дайын мәтінді «Жіберу» арқылы жіберіңіз.",
    o_sos_note: "Адамдар зардап шекті ме? Алдымен 112-ге қоңырау шалыңыз.",
    o_route_fail: "Маршрут есептелмеді — қашықтық шамамен көрсетілді",
    o_here: "Мен осындамын", o_map_open: "Картадан дәлдеу", o_map_done: "Дайын", o_map_tap: "Нүктені қою үшін картаны басыңыз",
    o_set_from: "«Қайдан»", o_set_to: "«Қайда»", o_to_you: "Сізге дейін",
    o_photos: "Фото (міндетті емес, 3-ке дейін)", o_photos_hint: "Көліктің немесе жағдайдың фотосы жүргізушіге көмектеседі", o_add_photo: "Фото қосу", o_uploading: "Фото жүктелуде…", o_photo_err: "Фото жүктелмеді, оларсыз жіберіледі",
    o_search_none: "Ештеңе табылмады. Басқаша жазып көріңіз немесе картадан көрсетіңіз.",
    // track page
    t_title: "Тапсырыс", t_no: "Тапсырыс №", t_notfound: "Тапсырыс табылмады", t_new_order: "Жаңа тапсырыс",
    st_new: "Жүргізуші ізделуде", st_accepted: "Жүргізуші табылды", st_onway: "Жүргізуші жолда", st_arrived: "Жүргізуші келді", st_done: "Тапсырыс аяқталды", st_cancelled: "Тапсырыс тоқтатылды",
    st_new_d: "Тапсырыс қабылданды. Диспетчер жақын жүргізушіні тауып, сізге қоңырау шалады.",
    st_accepted_d: "Жүргізуші тапсырысты қабылдады.", st_onway_d: "Жүргізуші сізге қарай келе жатыр.", st_arrived_d: "Жүргізуші орнында.",
    st_done_d: "EVAGO-ны таңдағаныңызға рахмет!", st_cancelled_d: "Қажет болса, жаңа тапсырыс беріңіз.",
    t_driver: "Жүргізуші", t_eta: "Келу уақыты", t_call: "Қоңырау шалу", t_cancel: "Тапсырысты тоқтату", t_cancel_q: "Тапсырысты шынымен тоқтатасыз ба?", t_yes: "Иә, тоқтату", t_no_btn: "Жоқ",
    t_rate: "Жүргізушіні бағалаңыз", t_review_ph: "Пікір жазу (міндетті емес)", t_send: "Жіберу", t_thanks: "Бағаңызға рахмет!",
    t_wa_last: "Соңғы қадам: тапсырысты WhatsApp-қа жіберіңіз", t_wa_q: "Тезірек керек пе? WhatsApp-қа жазыңыз", t_wa_d: "Мәтін дайын — тек «Жіберу» басыңыз. Диспетчер бірден көреді.", t_wa_btn: "WhatsApp-қа жіберу",
    t_updated: "Автоматты түрде жаңарады", t_saved: "Бұл бетті сақтап қойыңыз — тапсырыс күйін осы жерден көресіз.",
    // driver page
    dr_title: "EVAGO жүргізушісі болу", dr_lead: "Өтінім қалдырыңыз — біз сізге хабарласып, құжаттарды тексеріп, жұмысқа қосамыз.",
    dr_name: "Аты-жөніңіз", dr_phone: "Телефон", dr_truck: "Эвакуатор түрі", dr_plate: "Мемлекеттік нөмір", dr_city: "Қала",
    dr_send: "Өтінім жіберу", dr_ok: "Өтінім қабылданды! Жақын арада хабарласамыз.", dr_err: "Өтінім жіберілмеді. Қайта көріңіз.",
    tr1: "Сынықты платформа (жеңіл көлікке)", tr2: "Манипулятор", tr3: "Жүк эвакуаторы", tr4: "Техникалық көмек көлігі",
    dr_need: "Аты-жөніңізді және телефонды толтырыңыз",
    // drive page (driver by link)
    dv_title: "Тапсырыс", dv_client: "Клиент", dv_call: "Клиентке қоңырау", dv_nav: "Навигатор", dv_comment: "Түсініктеме",
    dv_onway: "Жолға шықтым", dv_arrived: "Орнына келдім", dv_done: "Тапсырыс аяқталды",
    dv_gps_on: "Орныңыз клиентке көрсетілуде", dv_gps_off: "Геолокация өшік — клиент сізді картадан көрмейді. Рұқсат беріңіз.",
    dv_keep: "Тапсырыс біткенше бұл бетті жаппаңыз", dv_bad: "Сілтеме жарамсыз немесе тапсырыс жабылған", dv_finished: "Тапсырыс жабылды. Рахмет!",
    dv_price: "Бағасы", t_driver_here: "Жүргізуші осында", t_seen: "жаңартылды"
  },
  ru: {
    nav_home: "Главная", nav_services: "Услуги", nav_tariffs: "Тарифы", nav_drivers: "Водителям", nav_contact: "Контакты",
    call: "Вызвать эвакуатор", menu: "Меню",
    badge: "Работаем в Алматы круглосуточно",
    h1a: "На дороге", h1b: "вы не одни.",
    lead: "EVAGO — надёжная помощь на дороге. Отметьте место на карте, узнайте цену заранее, и эвакуатор выедет к вам.",
    about_services: "Виды помощи",
    st1: "круглосуточно", st2: "видов помощи", st3: "типов авто",
    from: "Откуда?", to: "Куда?", addr_ph: "Введите адрес", car: "Тип авто",
    svc_eyebrow: "Услуги", svc_h: "Помощь в любой ситуации на дороге", svc_p: "Мы не просто эвакуатор — мы ваш надёжный помощник в пути.",
    from_price: "от",
    how_e: "Как это работает", how_h: "4 шага от вызова до приезда",
    s1h: "Отметьте, где вы", s1p: "Карта сама определит ваше местоположение. Укажите, куда везти.",
    s2h: "Узнайте цену", s2p: "Выберите тип авто — расстояние и примерная цена посчитаются сразу.",
    s3h: "Оформите заказ", s3p: "Оставьте номер. Диспетчер найдёт ближайшего водителя и позвонит вам.",
    s4h: "Следите за статусом", s4p: "На странице заказа видно, кто водитель и когда он приедет.",
    tar_h: "Открытые цены", tar_h2: "Цены на эвакуатор", tow_of: "Эвакуатор:", call_help: "Вызвать помощь", tar_p: "Эвакуатор: подача + каждый километр. Остальные услуги: минимальная цена + расстояние до вас.",
    th_car: "Тип авто", th_base: "Подача", th_km: "1 км", th_ex: "Например, 10 км",
    th_svc: "Услуга", th_price: "Цена", th_min: "Минимум", th_perkm: "1 км",
    tnote: "Цены примерные. Точную цену водитель подтвердит до выезда. Оплата наличными или переводом.",
    drv_eyebrow: "Водителям", drv_h: "Есть эвакуатор? Работайте с EVAGO",
    d1: "Заказы рядом с вами", d2: "Сами выбираете, когда работать", d3: "Оплата сразу после заказа",
    drv_btn: "Оставить заявку",
    app_h: "Помощь — на расстоянии одной кнопки.", app_p: "Приложение EVAGO в разработке. Пока оформляйте заказ на сайте — всё работает и с телефона.",
    p1: "Быстро", p1d: "Заказ оформляется за минуту", p2: "Надёжно", p2d: "Проверенные водители", p3: "Удобно", p3d: "Цена известна заранее",
    soon: "Скоро",
    contact_h: "Контакты", cb_h: "Есть вопрос? Напишите нам", cb_p: "Пишите в WhatsApp или звоните — отвечаем круглосуточно.", wa_hello: "Здравствуйте! Пишу с сайта EVAGO.", contact_order: "Оформите заказ на сайте — диспетчер сам вам позвонит.",
    copy: "Копировать", copied: "Скопировано", rights: "Все права защищены", slogan: "Надёжная помощь на дороге всегда рядом.",
    qo_note: "На следующем шаге кнопка «Я здесь» покажет ваше место в одно касание",
    active_order: "У вас есть активный заказ", open: "Открыть",
    sos: "SOS",
    o_title: "Оформление заказа", o_back: "Назад", o_service: "Что случилось?", o_where: "Где вы?",
    o_locating: "Определяем ваше местоположение…", o_loc_denied: "Нет доступа к геолокации. Введите адрес или нажмите на карту.",
    o_loc_btn: "Моё место", o_tap_from: "Нажмите на карту, чтобы поставить точку «Откуда»", o_tap_to: "Нажмите на карту, чтобы поставить точку «Куда»",
    o_distance: "Расстояние", o_time: "В пути", o_price: "Примерная цена", o_min: "мин", o_km: "км",
    o_next: "Продолжить", o_need_from: "Укажите адрес «Откуда»", o_need_to: "Укажите адрес «Куда»",
    o_details: "Детали заказа", o_problem: "Что случилось? (необязательно)",
    pr1: "Не заводится", pr2: "ДТП", pr3: "Сломался двигатель", pr4: "В кювете", pr5: "Пробито колесо", pr6: "Другое",
    o_comment: "Комментарий", o_comment_ph: "Например: марка и цвет авто, ориентиры", o_name: "Ваше имя", o_name_ph: "Имя",
    o_phone: "Номер телефона", o_phone_err: "Введите номер полностью: +7 и 10 цифр",
    o_send: "Вызвать эвакуатор", o_sending: "Отправляем…", o_send_err: "Заказ не отправился. Проверьте интернет и нажмите ещё раз.",
    o_too_many: "Слишком много заказов. Повторите через 10 минут.",
    o_summary: "Заказ", o_agree: "После нажатия откроется WhatsApp — просто нажмите «Отправить», текст заказа уже готов.",
    o_sos_note: "Есть пострадавшие? Сначала позвоните 112.",
    o_route_fail: "Маршрут не построился — расстояние указано примерно",
    o_here: "Я здесь", o_map_open: "Уточнить на карте", o_map_done: "Готово", o_map_tap: "Нажмите на карту, чтобы поставить точку",
    o_set_from: "«Откуда»", o_set_to: "«Куда»", o_to_you: "До вас",
    o_photos: "Фото (необязательно, до 3)", o_photos_hint: "Фото авто или ситуации поможет водителю", o_add_photo: "Добавить фото", o_uploading: "Загружаем фото…", o_photo_err: "Фото не загрузились, заказ уйдёт без них",
    o_search_none: "Ничего не нашлось. Напишите иначе или укажите на карте.",
    t_title: "Заказ", t_no: "Заказ №", t_notfound: "Заказ не найден", t_new_order: "Новый заказ",
    st_new: "Ищем водителя", st_accepted: "Водитель найден", st_onway: "Водитель в пути", st_arrived: "Водитель на месте", st_done: "Заказ выполнен", st_cancelled: "Заказ отменён",
    st_new_d: "Заказ принят. Диспетчер найдёт ближайшего водителя и позвонит вам.",
    st_accepted_d: "Водитель принял заказ.", st_onway_d: "Водитель едет к вам.", st_arrived_d: "Водитель на месте.",
    st_done_d: "Спасибо, что выбрали EVAGO!", st_cancelled_d: "Если нужно, оформите новый заказ.",
    t_driver: "Водитель", t_eta: "Приедет через", t_call: "Позвонить", t_cancel: "Отменить заказ", t_cancel_q: "Точно отменить заказ?", t_yes: "Да, отменить", t_no_btn: "Нет",
    t_rate: "Оцените водителя", t_review_ph: "Напишите отзыв (необязательно)", t_send: "Отправить", t_thanks: "Спасибо за оценку!",
    t_wa_last: "Последний шаг: отправьте заказ в WhatsApp", t_wa_q: "Срочно? Напишите в WhatsApp", t_wa_d: "Текст уже готов — просто нажмите «Отправить». Диспетчер увидит сразу.", t_wa_btn: "Отправить в WhatsApp",
    t_updated: "Обновляется автоматически", t_saved: "Сохраните эту страницу — здесь виден статус заказа.",
    dr_title: "Стать водителем EVAGO", dr_lead: "Оставьте заявку — мы свяжемся, проверим документы и подключим вас.",
    dr_name: "ФИО", dr_phone: "Телефон", dr_truck: "Тип эвакуатора", dr_plate: "Госномер", dr_city: "Город",
    dr_send: "Отправить заявку", dr_ok: "Заявка принята! Скоро свяжемся.", dr_err: "Заявка не отправилась. Попробуйте ещё раз.",
    tr1: "Платформа (для легковых)", tr2: "Манипулятор", tr3: "Грузовой эвакуатор", tr4: "Машина техпомощи",
    dr_need: "Заполните ФИО и телефон",
    dv_title: "Заказ", dv_client: "Клиент", dv_call: "Позвонить клиенту", dv_nav: "Навигатор", dv_comment: "Комментарий",
    dv_onway: "Выехал", dv_arrived: "Я на месте", dv_done: "Заказ выполнен",
    dv_gps_on: "Ваше местоположение видно клиенту", dv_gps_off: "Геолокация выключена — клиент не видит вас на карте. Разрешите доступ.",
    dv_keep: "Не закрывайте страницу до конца заказа", dv_bad: "Ссылка недействительна или заказ закрыт", dv_finished: "Заказ закрыт. Спасибо!",
    dv_price: "Цена", t_driver_here: "Водитель здесь", t_seen: "обновлено"
  }
};

/* ===== Помощники ===== */
let LANG = "kz";
try { LANG = localStorage.getItem("evago_lang") || "kz"; } catch (e) {}
const t = k => (I18N[LANG] && I18N[LANG][k]) ?? I18N.kz[k] ?? k;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const money = n => new Intl.NumberFormat("ru-RU").format(Math.round(n / 100) * 100) + " ₸";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const carById = id => EVAGO.cars.find(c => c.id === id) || EVAGO.cars[0];
const svcById = id => EVAGO.services.find(s => s.id === id) || EVAGO.services[0];
const icon = (id, sw = 1.8) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[id]}</svg>`;

const MONTHS = {
  kz: ["қаң", "ақп", "нау", "сәу", "мам", "мау", "шіл", "там", "қыр", "қаз", "қар", "жел"],
  ru: ["янв", "фев", "мар", "апр", "мая", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"]
};
function fmtDate(v) {
  const d = new Date(v), p = n => String(n).padStart(2, "0");
  return `${d.getDate()} ${MONTHS[LANG][d.getMonth()]}, ${p(d.getHours())}:${p(d.getMinutes())}`;
}

// Эвакуатор: подача + км маршрута. Остальное: минимум + км от базы до клиента.
function priceFor(serviceId, carId, km) {
  const s = svcById(serviceId);
  if (s.id !== "tow") return s.base + s.km * Math.max(0, km || 0);
  const c = carById(carId);
  return c.base + c.km * Math.max(1, km || 0);
}
const minPrice = s => s.id === "tow" ? Math.min(...EVAGO.cars.map(c => c.base)) : s.base;

async function rpc(name, params) {
  const r = await fetch(`${EVAGO.supabaseUrl}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: { apikey: EVAGO.supabaseKey, Authorization: `Bearer ${EVAGO.supabaseKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  const text = await r.text();
  const data = text ? JSON.parse(text) : null;
  if (!r.ok) { const e = new Error((data && data.message) || r.statusText); e.data = data; throw e; }
  return data;
}

function normPhone(v) {
  let d = String(v).replace(/\D/g, "");
  if (d.length === 11 && (d[0] === "7" || d[0] === "8")) d = d.slice(1);
  return d.length === 10 ? "+7" + d : null;
}
function phoneMask(input) {
  input.addEventListener("input", () => {
    let d = input.value.replace(/\D/g, "");
    if (d.length > 10 && (d[0] === "7" || d[0] === "8")) d = d.slice(1);
    d = d.slice(0, 10);
    const p = [d.slice(0, 3), d.slice(3, 6), d.slice(6, 8), d.slice(8, 10)].filter(Boolean);
    input.value = p.join(" ");
  });
}

/* ===== Шапка и подвал (одинаковые на всех страницах) ===== */
function renderChrome() {
  const page = document.body.dataset.page;
  const head = $("#site-header");
  if (head) head.innerHTML = `
    <div class="wrap nav">
      <a class="logo" href="index.html" aria-label="EVAGO">EVA<span>GO</span></a>
      <nav class="menu" aria-label="${t("menu")}">
        <a href="index.html" ${page === "home" ? 'aria-current="page"' : ""}>${t("nav_home")}</a>
        <a href="index.html#services">${t("nav_services")}</a>
        <a href="index.html#tariffs">${t("nav_tariffs")}</a>
        <a href="driver.html" ${page === "driver" ? 'aria-current="page"' : ""}>${t("nav_drivers")}</a>
        <a href="index.html#contacts">${t("nav_contact")}</a>
      </nav>
      <div class="nav-r">
        <div class="lang" role="group" aria-label="Тіл / Язык">
          <button type="button" data-lang="kz" aria-pressed="${LANG === "kz"}">KZ</button>
          <button type="button" data-lang="ru" aria-pressed="${LANG === "ru"}">RU</button>
        </div>
        ${page !== "order" ? `<a class="btn btn-y btn-sm nav-cta" href="order.html">${t("call")}</a>` : ""}
        <button class="burger" type="button" aria-label="${t("menu")}" aria-expanded="false"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
      </div>
    </div>
    <div class="wrap mobile-menu">
      <a href="index.html">${t("nav_home")}</a><a href="index.html#services">${t("nav_services")}</a><a href="index.html#tariffs">${t("nav_tariffs")}</a><a href="driver.html">${t("nav_drivers")}</a><a href="index.html#contacts">${t("nav_contact")}</a>
      <a class="btn btn-y" href="order.html">${t("call")}</a>
    </div>`;
  $$("[data-lang]").forEach(b => b.onclick = () => setLang(b.dataset.lang));
  const burger = $(".burger");
  if (burger) burger.onclick = () => { const m = $(".mobile-menu"); m.classList.toggle("open"); burger.setAttribute("aria-expanded", m.classList.contains("open")); };
  $$(".mobile-menu a").forEach(a => a.addEventListener("click", () => $(".mobile-menu").classList.remove("open")));

  const foot = $("#contact");
  if (foot) {
    const hasPhone = !!EVAGO.phone;
    foot.innerHTML = `
    <div class="wrap">
      <div class="foot">
        <div><a class="logo" href="index.html">EVA<span>GO</span></a><p>${t("slogan")}</p></div>
        <div class="foot-col"><h4>${t("contact_h")}</h4>
          ${hasPhone ? `<span><a class="num" href="tel:${EVAGO.phone.replace(/\s/g, "")}">${esc(EVAGO.phone)}</a> <button class="copy" type="button" data-copy="${esc(EVAGO.phone)}">${t("copy")}</button></span>` : `<span>${t("contact_order")}</span>`}
          ${EVAGO.whatsapp ? `<a href="https://wa.me/${EVAGO.whatsapp}" target="_blank" rel="noopener">WhatsApp</a>` : ""}
          ${EVAGO.instagram ? `<a href="https://instagram.com/${EVAGO.instagram}" target="_blank" rel="noopener">Instagram</a>` : ""}
          <span>${EVAGO.city[LANG]} · 24/7</span></div>
        <div class="foot-col"><h4>${t("nav_services")}</h4>${EVAGO.services.slice(0, 4).map(s => `<a href="order.html?s=${s.id}">${s[LANG][0]}</a>`).join("")}</div>
        <div class="foot-col"><h4>EVAGO</h4><a href="order.html">${t("call")}</a><a href="index.html#tariffs">${t("nav_tariffs")}</a><a href="driver.html">${t("nav_drivers")}</a></div>
      </div>
      <div class="foot-bottom"><span>© ${new Date().getFullYear()} EVAGO</span><span>${t("rights")}</span></div>
    </div>`;
    $$("[data-copy]", foot).forEach(b => b.onclick = async () => {
      try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = t("copied"); } catch (e) {}
    });
  }
  const wa = $("#fab-wa");
  if (wa) { wa.hidden = !EVAGO.whatsapp; wa.href = "https://wa.me/" + EVAGO.whatsapp; }
}

function applyI18n(root = document) {
  document.documentElement.lang = LANG === "kz" ? "kk" : "ru";
  $$("[data-i]", root).forEach(el => { el.textContent = t(el.dataset.i); });
  $$("[data-ph]", root).forEach(el => { el.placeholder = t(el.dataset.ph); });
}

const langListeners = [];
function onLang(fn) { langListeners.push(fn); }
function setLang(l) {
  LANG = l;
  try { localStorage.setItem("evago_lang", l); } catch (e) {}
  renderChrome(); applyI18n(); langListeners.forEach(f => f());
}

// Последний заказ клиента. Через 6 часов считаем его закрытым, чтобы не висела старая плашка.
function lastOrder(id) {
  try {
    if (id !== undefined) {
      if (id) localStorage.setItem("evago_last_order", JSON.stringify({ id, t: Date.now() }));
      else localStorage.removeItem("evago_last_order");
    }
    const raw = localStorage.getItem("evago_last_order");
    if (!raw) return null;
    let v; try { v = JSON.parse(raw); } catch (e) { v = { id: raw, t: 0 }; }
    if (!v || !v.id || Date.now() - (v.t || 0) > 6 * 3600 * 1000) { localStorage.removeItem("evago_last_order"); return null; }
    return v.id;
  } catch (e) { return null; }
}

document.addEventListener("DOMContentLoaded", () => { renderChrome(); applyI18n(); });
