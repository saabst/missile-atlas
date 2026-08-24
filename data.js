// ============================================================================
//  РАКЕТНЫЙ АТЛАС — открытая база данных ракетных комплексов
//  Все данные — из публичных источников (CSIS Missile Threat, открытые
//  справочники и СМИ). Дальности указаны ИНТЕРВАЛОМ [min..max] км — разброс
//  публикаций. Координаты с approximate:true — приблизительные зоны.
//
//  Схема записи:
//  {
//    id, name,
//    country: строка ИЛИ массив строк (совместные разработки),
//    klass: "Крылатая"|"Баллистическая"|"Гиперзвуковая"|"МБР",
//    platform: носитель/базирование,
//    speed_mach: число|null, speed_kmh: число|null (для расчёта времени полёта),
//    range_km_min, range_km_max,
//    status: "на вооружении"|"в разработке"|"экспортный"|"исторический",
//    flight_note: текстовая оценка времени полёта для небаллистических траекторий|null,
//    notes: свободный комментарий,
//    sources: [{label, url}],
//    deployments: [{name, lat, lon, approximate: bool}] | []
//  }
// ============================================================================

const DATA_META = {
  version: "0.1.0",
  updated: "2026-08-24",
  disclaimer: "Образовательный проект. Все сведения из открытых источников."
};

const SYSTEMS = [
  // ---------------------------------------------------------------- КРЫЛАТЫЕ
  {
    id: "kalibr-3m14",
    name: "Калибр (3М14)",
    country: "Россия", klass: "Крылатая",
    platform: "корабли надводные и подводные",
    speed_mach: 0.8, speed_kmh: 890,
    range_km_min: 1500, range_km_max: 2500,
    status: "на вооружении",
    flight_note: null,
    notes: "Дальность по наземным целям в разных публикациях от ~1500 до ~2500 км. Маршевая скорость дозвуковая.",
    sources: [
      {label: "CSIS Missile Threat", url: "https://missilethreat.csis.org"},
      {label: "Wikipedia: 3M-54 Kalibr", url: "https://en.wikipedia.org/wiki/3M-54_Kalibr"}
    ],
    deployments: [
      {name: "ВМБ Балтийск", lat: 54.651, lon: 19.917, approximate: false},
      {name: "ВМБ Севастополь", lat: 44.616, lon: 33.525, approximate: false},
      {name: "ВМБ Новороссийск", lat: 44.720, lon: 37.785, approximate: false}
    ]
  },
  {
    id: "tomahawk-blkv",
    name: "Томагавк (BGM-109 Block V)",
    country: "США", klass: "Крылатая",
    platform: "надводные корабли и подлодки",
    speed_mach: 0.74, speed_kmh: 880,
    range_km_min: 1600, range_km_max: 1850,
    status: "на вооружении",
    flight_note: null,
    notes: "Block V — модернизация со увеличенной дальностью и каналом связи в полёте.",
    sources: [
      {label: "Wikipedia: BGM-109 Tomahawk", url: "https://en.wikipedia.org/wiki/BGM-109_Tomahawk"}
    ],
    deployments: [
      {name: "Авиабаза Андерсен (Гуам)", lat: 13.584, lon: 144.924, approximate: false},
      {name: "ВМБ Рота (Испания)", lat: 36.617, lon: -6.347, approximate: false},
      {name: "ВМБ Йокосука (Япония)", lat: 35.288, lon: 139.670, approximate: false},
      {name: "Диего-Гарсия", lat: 7.313, lon: 72.411, approximate: false}
    ]
  },
  {
    id: "kh-101",
    name: "Х-101 / Х-102",
    country: "Россия", klass: "Крылатая",
    platform: "стратегические бомбардировщики Ту-95МС, Ту-160",
    speed_mach: 0.75, speed_kmh: 850,
    range_km_min: 4500, range_km_max: 5500,
    status: "на вооружении",
    flight_note: null,
    notes: "Одна из самых дальнобойных КР. Х-102 — спецБЧ. Заявленные значения дальности расходятся между источниками.",
    sources: [
      {label: "CSIS Missile Threat", url: "https://missilethreat.csis.org"},
      {label: "Wikipedia: Kh-101/Kh-102", url: "https://en.wikipedia.org/wiki/Kh-101/Kh-102"}
    ],
    deployments: [
      {name: "авиабаза Энгельс", lat: 51.482, lon: 46.245, approximate: false},
      {name: "аэродром Оленья", lat: 68.901, lon: 33.750, approximate: true}
    ]
  },
  {
    id: "jassm-agm158",
    name: "JASSM / JASSM-ER (AGM-158)",
    country: "США", klass: "Крылатая",
    platform: "B-1B, B-2, F-15E, F-16, F/A-18 и др.",
    speed_mach: 0.85, speed_kmh: 985,
    range_km_min: 370, range_km_max: 1000,
    status: "на вооружении",
    flight_note: null,
    notes: "Интервал охватывает семейство: базовая AGM-158A (~370 км) и ER (~925–1000 км). Малозаметная.",
    sources: [
      {label: "Wikipedia: AGM-158 JASSM", url: "https://en.wikipedia.org/wiki/AGM-158_JASSM"}
    ],
    deployments: [
      {name: "Авиабаза Андерсен (Гуам)", lat: 13.584, lon: 144.924, approximate: false},
      {name: "Диего-Гарсия", lat: 7.313, lon: 72.411, approximate: false},
      {name: "Авиабаза Рамштайн (Германия)", lat: 49.437, lon: 7.600, approximate: true}
    ]
  },
  {
    id: "storm-shadow",
    name: "Storm Shadow / SCALP EG",
    country: ["Великобритания", "Франция"], klass: "Крылатая",
    platform: "Tornado GR4, Typhoon, Rafale, Mirage 2000",
    speed_mach: 0.9, speed_kmh: 1000,
    range_km_min: 250, range_km_max: 560,
    status: "на вооружении",
    flight_note: null,
    notes: "Экспортная версия ограничена ~250 км; внутренние модификации — до ~560 км. Пример того, почему нужны интервалы.",
    sources: [
      {label: "Wikipedia: Storm Shadow", url: "https://en.wikipedia.org/wiki/Storm_Shadow"}
    ],
    deployments: [
      {name: "RAF Лоссимут (Шотландия)", lat: 57.651, lon: -3.560, approximate: false},
      {name: "Сен-Дизье-Робен (Франция)", lat: 48.637, lon: 4.906, approximate: false}
    ]
  },
  {
    id: "taurus-kepd350",
    name: "Taurus KEPD 350",
    country: ["Германия", "Швеция"], klass: "Крылатая",
    platform: "Tornado IDS, Typhoon (план), Gripen",
    speed_mach: 0.9, speed_kmh: 1000,
    range_km_min: 500, range_km_max: 600,
    status: "на вооружении",
    flight_note: null,
    notes: "Двухступенчатая БЧ Mephisto для заглублённых целей. Обсуждается поставка Украине.",
    sources: [
      {label: "Wikipedia: TAURUS KEPD 350", url: "https://en.wikipedia.org/wiki/TAURUS_KEPD_350"}
    ],
    deployments: [
      {name: "авиабаза Бюхель (Германия)", lat: 50.172, lon: 7.062, approximate: false},
      {name: "авиабаза Норвених (Германия)", lat: 50.870, lon: 6.660, approximate: false}
    ]
  },
  {
    id: "brahmos-a",
    name: "БраМос (BrahMos-A)",
    country: ["Индия", "Россия"], klass: "Крылатая",
    platform: "Су-30МКИ, корабли, наземные ПУ",
    speed_mach: 2.8, speed_kmh: 3400,
    range_km_min: 290, range_km_max: 450,
    status: "на вооружении",
    flight_note: null,
    notes: "Сверхзвуковая. Модификации Block III заявляют до ~800 км — за пределами интервала учтено примечанием, не кольцом.",
    sources: [
      {label: "Wikipedia: BrahMos", url: "https://en.wikipedia.org/wiki/BrahMos"}
    ],
    deployments: [
      {name: "Андаманские о-ва, Порт-Блэр", lat: 11.623, lon: 92.726, approximate: false}
    ]
  },
  {
    id: "iskander-k",
    name: "Искандер-К (9М728/9М729)",
    country: "Россия", klass: "Крылатая",
    platform: "самоходная наземная ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 380, range_km_max: 500,
    status: "на вооружении",
    flight_note: null,
    notes: "Крылатая версия комплекса Искандер. Оценки дальности расходились ещё в период спора вокруг ДРСМД.",
    sources: [
      {label: "CSIS Missile Threat", url: "https://missilethreat.csis.org"},
      {label: "Wikipedia: 9K720 Iskander", url: "https://en.wikipedia.org/wiki/9K720_Iskander"}
    ],
    deployments: [
      {name: "Черняховск (Калининградская обл.)", lat: 54.604, lon: 21.074, approximate: false},
      {name: "Осиповичи (Беларусь)", lat: 53.306, lon: 32.325, approximate: true}
    ]
  },
  {
    id: "cj10-dh10",
    name: "CJ-10 / DH-10",
    country: "Китай", klass: "Крылатая",
    platform: "наземные мобильные ПУ, H-6K",
    speed_mach: 0.8, speed_kmh: 880,
    range_km_min: 1200, range_km_max: 1600,
    status: "на вооружении",
    flight_note: null,
    notes: "Семейство китайских дозвуковых КР; авиационный вариант обозначается KD-20.",
    sources: [
      {label: "CSIS Missile Threat", url: "https://missilethreat.csis.org"},
      {label: "Wikipedia: CJ-10", url: "https://en.wikipedia.org/wiki/CJ-10_(missile)"}
    ],
    deployments: [
      {name: "побережье Фуцзянь", lat: 24.480, lon: 118.090, approximate: true},
      {name: "район Корла (Синьцзян)", lat: 41.660, lon: 86.140, approximate: true}
    ]
  },

  // ---------------------------------------------------------- БАЛЛИСТИЧЕСКИЕ
  {
    id: "iskander-m",
    name: "Искандер-М (9М723)",
    country: "Россия", klass: "Баллистическая",
    platform: "самоходная наземная ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 480, range_km_max: 700,
    status: "на вооружении",
    flight_note: "до ~500 км — порядка 5–7 минут (квазибаллистическая траектория)",
    notes: "Официально 500 км; часть источников утверждает большие значения. Мобильность делает точку пуска переменной.",
    sources: [
      {label: "Wikipedia: 9K720 Iskander", url: "https://en.wikipedia.org/wiki/9K720_Iskander"}
    ],
    deployments: [
      {name: "Черняховск (Калининградская обл.)", lat: 54.604, lon: 21.074, approximate: false},
      {name: "Ельня (Смоленская обл.)", lat: 54.570, lon: 32.570, approximate: true},
      {name: "Осиповичи (Беларусь)", lat: 53.306, lon: 32.325, approximate: true}
    ]
  },
  {
    id: "atacms",
    name: "ATACMS (MGM-140)",
    country: "США", klass: "Баллистическая",
    platform: "M270 MLRS, HIMARS",
    speed_mach: null, speed_kmh: null,
    range_km_min: 165, range_km_max: 300,
    status: "на вооружении",
    flight_note: "~300 км — порядка 2–3 минут",
    notes: "Интервал охватывает семейство блоков (Block I ~165 км … Block IA/unitary ~300 км).",
    sources: [
      {label: "Wikipedia: MGM-140 ATACMS", url: "https://en.wikipedia.org/wiki/MGM-140_ATACMS"}
    ],
    deployments: [
      {name: "Кэмп-Хамфрис (Южная Корея)", lat: 36.957, lon: 127.029, approximate: false}
    ]
  },
  {
    id: "prsm",
    name: "Precision Strike Missile (PrSM)",
    country: "США", klass: "Баллистическая",
    platform: "M270A2, HIMARS",
    speed_mach: null, speed_kmh: null,
    range_km_min: 500, range_km_max: 650,
    status: "в разработке",
    flight_note: null,
    notes: "Приёмник ATACMS. Начальная версия ≥499 км, инкрементальные наращивания до ~650+ км.",
    sources: [
      {label: "Wikipedia: Precision Strike Missile", url: "https://en.wikipedia.org/wiki/Precision_Strike_Missile"}
    ],
    deployments: [
      {name: "Кэмп-Хамфрис (Южная Корея) — план", lat: 36.957, lon: 127.029, approximate: true}
    ]
  },
  {
    id: "df-21d",
    name: "DF-21D",
    country: "Китай", klass: "Баллистическая",
    platform: "наземные мобильные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 1500, range_km_max: 1700,
    status: "на вооружении",
    flight_note: "~1500 км — оценка ~12 минут",
    notes: "«Убийца авианосцев» — баллистическая ракета с маневрирующей ГЧ против движущихся кораблей.",
    sources: [
      {label: "CSIS Missile Threat", url: "https://missilethreat.csis.org"},
      {label: "Wikipedia: DF-21", url: "https://en.wikipedia.org/wiki/DF-21"}
    ],
    deployments: [
      {name: "побережье Фуцзянь", lat: 24.480, lon: 118.090, approximate: true}
    ]
  },
  {
    id: "df-26",
    name: "DF-26",
    country: "Китай", klass: "Баллистическая",
    platform: "наземные мобильные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 3500, range_km_max: 4000,
    status: "на вооружении",
    flight_note: null,
    notes: "«Гуамский убийца»: закрывает базу Андерсен целиком. Способен поражать и корабли.",
    sources: [
      {label: "Wikipedia: DF-26", url: "https://en.wikipedia.org/wiki/DF-26"}
    ],
    deployments: [
      {name: "район Корла (Синьцзян)", lat: 41.660, lon: 86.140, approximate: true},
      {name: "Хайнань, район Юйлинь", lat: 18.225, lon: 109.698, approximate: true}
    ]
  },
  {
    id: "df-17",
    name: "DF-17",
    country: "Китай", klass: "Гиперзвуковая",
    platform: "наземные мобильные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 1800, range_km_max: 2500,
    status: "на вооружении",
    flight_note: null,
    notes: "Носит гиперзвуковой планировающий блок DF-ZF на квазибаллистической траектории.",
    sources: [
      {label: "Wikipedia: DF-17", url: "https://en.wikipedia.org/wiki/DF-17"}
    ],
    deployments: [
      {name: "побережье Фуцзянь", lat: 24.480, lon: 118.090, approximate: true},
      {name: "Хайнань", lat: 19.500, lon: 109.900, approximate: true}
    ]
  },
  {
    id: "kinzhal",
    name: "Кинжал (Х-47М2)",
    country: "Россия", klass: "Гиперзвуковая",
    platform: "МиГ-31К, Ту-22М3 (заявлено)",
    speed_mach: null, speed_kmh: null,
    range_km_min: 1500, range_km_max: 2000,
    status: "на вооружении",
    flight_note: "заявленная дальность включает радиус носителя; собственная дальность оценивается западными источниками существенно ниже",
    notes: "Аэробаллистическая с маневрирующей ГЧ. Заявления о «неуязвимости» оспорены применением Patriot в 2023.",
    sources: [
      {label: "Wikipedia: Kh-47M2 Kinzhal", url: "https://en.wikipedia.org/wiki/Kh-47M2_Kinzhal"}
    ],
    deployments: [
      {name: "Черняховск (Калининградская обл.)", lat: 54.604, lon: 21.074, approximate: false},
      {name: "Морозовск (Ростовская обл.)", lat: 49.551, lon: 41.852, approximate: true}
    ]
  },
  {
    id: "zircon",
    name: "Циркон (3М22)",
    country: "Россия", klass: "Гиперзвуковая",
    platform: "корабли (фрегаты), подлодки",
    speed_mach: 8, speed_kmh: 9000,
    range_km_min: 800, range_km_max: 1000,
    status: "на вооружении",
    flight_note: null,
    notes: "Крылатая гиперзвуковая (маршевый прямоточный двигатель). Часть пути может проходить по баллистической схеме.",
    sources: [
      {label: "Wikipedia: 3M-22 Zircon", url: "https://en.wikipedia.org/wiki/3M22_Zircon"}
    ],
    deployments: [
      {name: "Северодвинск (Севмаш)", lat: 64.562, lon: 39.833, approximate: false},
      {name: "ВМБ Севастополь", lat: 44.616, lon: 33.525, approximate: true}
    ]
  },
  {
    id: "kheibar-shekan",
    name: "Хейбар Шекан (Kheibar Shekan)",
    country: "Иран", klass: "Баллистическая",
    platform: "наземные мобильные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 1400, range_km_max: 1450,
    status: "на вооружении",
    flight_note: null,
    notes: "Твердотопливная с разделяющейся ГЧ; представлена в 2023.",
    sources: [
      {label: "CSIS Missile Threat", url: "https://missilethreat.csis.org"},
      {label: "Wikipedia: Kheibar Shekan", url: "https://en.wikipedia.org/wiki/Kheibar_Shekan"}
    ],
    deployments: [
      {name: "район Тебриза", lat: 38.055, lon: 46.292, approximate: true},
      {name: "район Хоррамабада", lat: 33.487, lon: 48.352, approximate: true}
    ]
  },
  {
    id: "emad",
    name: "Эмад (Emad)",
    country: "Иран", klass: "Баллистическая",
    platform: "наземные мобильные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 1600, range_km_max: 1700,
    status: "на вооружении",
    flight_note: null,
    notes: "Модификация Ghadr с управляемой возвращаемой ГЧ.",
    sources: [
      {label: "Wikipedia: Emad (missile)", url: "https://en.wikipedia.org/wiki/Emad_(missile)"}
    ],
    deployments: [
      {name: "район Керманшаха", lat: 34.314, lon: 47.065, approximate: true},
      {name: "район Хоррамабада", lat: 33.487, lon: 48.352, approximate: true}
    ]
  },
  {
    id: "pershing-ii",
    name: "Pershing II (MGM-31B)",
    country: "США", klass: "Баллистическая",
    platform: "гусеничные самоходные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 1600, range_km_max: 1770,
    status: "исторический",
    flight_note: null,
    notes: "Ликвидирована по ДРСМД (1987–1991). Включена как исторический ориентир масштаба театральных ракет.",
    sources: [
      {label: "Wikipedia: MGM-31 Pershing", url: "https://en.wikipedia.org/wiki/MGM-31_Pershing"}
    ],
    deployments: []
  },
  {
    id: "hyunmoo-5",
    name: "Hyunmoo-5",
    country: "Южная Корея", klass: "Баллистическая",
    platform: "тяжёлые ТПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 300, range_km_max: 5500,
    status: "на вооружении",
    flight_note: null,
    notes: "Экстремальный интервал — особенность системы: сверхтяжёлая ГЧ (~8 т) при малой дальности либо лёгкая ГЧ при большой. Показывает, как один комплекс покрывает разные сценарии.",
    sources: [
      {label: "Wikipedia: Hyunmoo", url: "https://en.wikipedia.org/wiki/Hyunmoo"}
    ],
    deployments: []
  },

  // ---------------------------------------------------------------- УКРАИНА
  {
    id: "neptune-r360",
    name: "Нептун (Р-360)",
    country: "Украина", klass: "Крылатая",
    platform: "мобильные береговые ПУ",
    speed_mach: 0.85, speed_kmh: 900,
    range_km_min: 280, range_km_max: 300,
    status: "на вооружении",
    flight_note: null,
    notes: "Противокорабельная; в апреле 2022 двумя попаданиями выведен из строя крейсер «Москва». Применялась и по наземным целям.",
    sources: [
      {label: "Wikipedia: R-360 Neptune", url: "https://en.wikipedia.org/wiki/R-360_Neptune"}
    ],
    deployments: []
  },
  {
    id: "long-neptune",
    name: "Длинный Нептун",
    country: "Украина", klass: "Крылатая",
    platform: "мобильные наземные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 500, range_km_max: 1000,
    status: "на вооружении",
    flight_note: null,
    notes: "Модернизация Р-360 под удары по наземным целям. Заявлена дальность до 1000 км (март 2025); независимых подтверждений верхней границы нет.",
    sources: [
      {label: "Слово и Дело: сравнение украинских ракет", url: "https://ru.slovoidilo.ua/2025/09/03/infografika/obshhestvo/novye-ukrainskie-rakety-kakaya-dalnost-skorost-i-ves-boegolovok"}
    ],
    deployments: []
  },
  {
    id: "flamingo",
    name: "Фламинго",
    country: "Украина", klass: "Крылатая",
    platform: "наземные ТПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 1000, range_km_max: 3000,
    status: "в разработке",
    flight_note: null,
    notes: "Анонс августа 2025; госиспытания пройдено, серийное производство. Заявлено до 3000 км и БЧ свыше 1 т; наблюдатели оценивают практически достижимые цели до ~2400 км. Самый широкий интервал в базе — данные только от разработчика.",
    sources: [
      {label: "BBC: что известно о «Фламинго»", url: "https://www.bbc.com/russian/articles/cy0qd5png8qo"},
      {label: "Wikipedia: Фламинго (ракета)", url: "https://ru.wikipedia.org/wiki/%D0%A4%D0%BB%D0%B0%D0%BC%D0%B8%D0%BD%D0%B3%D0%BE_(%D1%80%D0%B0%D0%BA%D0%B5%D1%82%D0%B0)"}
    ],
    deployments: []
  },
  {
    id: "sapsan-hrim2",
    name: "Сапсан (Грим-2)",
    country: "Украина", klass: "Баллистическая",
    platform: "мобильные наземные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 280, range_km_max: 500,
    status: "в разработке",
    flight_note: null,
    notes: "ОТРК с БЧ ~500 кг; по состоянию на июнь 2025 — начальный этап серийного производства.",
    sources: [
      {label: "Wikipedia: Hrim-2", url: "https://en.wikipedia.org/wiki/Hrim-2"}
    ],
    deployments: []
  },

  // -------------------------------------------------------------------- МБР
  {
    id: "minuteman-iii",
    name: "Minuteman III (LGM-30G)",
    country: "США", klass: "МБР",
    platform: "шахтные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 13000, range_km_max: 15000,
    status: "на вооружении",
    flight_note: "межконтинентальная дистанция ~30 минут",
    notes: "Основание стратегической триады США; кольца носят иллюстративный характер глобального масштаба.",
    sources: [
      {label: "Wikipedia: LGM-30 Minuteman", url: "https://en.wikipedia.org/wiki/LGM-30_Minuteman"}
    ],
    deployments: [
      {name: "база Ф.Е. Уоррен (Вайоминг)", lat: 41.115, lon: -104.866, approximate: false},
      {name: "база Малмстрём (Монтана)", lat: 47.506, lon: -111.217, approximate: false},
      {name: "база Майнот (Северная Дакота)", lat: 48.415, lon: -101.321, approximate: false}
    ]
  },
  {
    id: "rs24-yars",
    name: "РС-24 Ярс",
    country: "Россия", klass: "МБР",
    platform: "шахтные и грунтовые мобильные ПУ",
    speed_mach: null, speed_kmh: null,
    range_km_min: 11000, range_km_max: 12000,
    status: "на вооружении",
    flight_note: "межконтинентальная дистанция ~30 минут",
    notes: "Развитие Тополь-М с РГЧ ИН. Точки — документированные соединения РВСН, зоны приблизительные.",
    sources: [
      {label: "Wikipedia: RS-24 Yars", url: "https://en.wikipedia.org/wiki/RS-24_Yars"}
    ],
    deployments: [
      {name: "Тейково (Ивановская обл.)", lat: 56.993, lon: 40.520, approximate: true}
    ]
  }
];
