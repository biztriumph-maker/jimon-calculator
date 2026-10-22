import { describe, expect, it } from 'vitest'
import { productById } from '../../data/catalog'
import {
  informationProductDetailById,
  informationProductDetailByScreen,
  informationProductDetails,
  PRODUCT_DETAIL_PROPERTIES_TITLE,
} from './productDetails'

describe('information product details', () => {
  it('connects the Birunkan detail to the existing commercial catalog entry', () => {
    const detail = informationProductDetailById.get('single-03')
    const product = productById.get('single-03')

    expect(detail?.screen).toBe('product-health-digestion-birunkan')
    expect(product?.nameRu).toBe('Бирункан')
    expect(product?.nameZh).toBe('碧润康')
    expect(product?.image).toContain('T03_birunkan')
    expect(detail?.heroImage).toEqual({
      src: '/images/birunkan-detail.png',
      alt: 'Упаковка Бирункана',
      width: 984,
      height: 793,
    })
    expect(informationProductDetailByScreen.get(detail!.screen)).toBe(detail)
  })

  it('keeps the final summary wording and editorial verification flags', () => {
    const detail = informationProductDetailById.get('single-03')

    expect(detail?.summary.intro).toBe(
      'Бирункан — растительный пищевой продукт JIMON в форме прессованных жевательных таблеток с листом лотоса, боярышником и другими растительными компонентами.',
    )
    expect(detail?.summary.propertiesTitle).toBe('По опыту команды')
    expect(detail?.summary.properties.map((property) => property.text)).toEqual([
      'Мягкая детоксикация организма.',
      'Снижение и контроль веса.',
      'Уменьшает отёки, выводит избыточную жидкость.',
      'Способствует очистке кишечника и нормализации обмена веществ.',
      'Укрепляет печень и селезёнку.',
      'Способствует устранению воспалительных процессов в организме.',
      'Способствует нормализации и поддержанию микрофлоры кишечника.',
    ])
    expect(
      detail?.summary.properties.every(
        (property) => property.verificationStatus === 'requires-confirmation',
      ),
    ).toBe(true)
  })

  it('provides the exact about-product facts', () => {
    const detail = informationProductDetailById.get('single-03')
    const about = detail?.sections.find((section) => section.id === 'characteristics')

    expect(about?.label).toBe('О продукте')
    expect(about?.title).toBe('О продукте')
    expect(about?.facts).toEqual([
      { label: 'Название', value: 'Бирункан (碧润康)' },
      { label: 'Форма выпуска', value: 'Прессованные жевательные таблетки.' },
      { label: 'Количество', value: '30 штук.' },
      { label: 'Масса одной таблетки', value: '0,7 г.' },
      { label: 'Общая масса', value: '21 г.' },
      { label: 'Срок хранения', value: '24 месяца.' },
      { label: 'Категория', value: 'Растительный пищевой продукт JIMON.' },
    ])
  })

  it('provides all 13 composition rows and one compact usage phrase', () => {
    const detail = informationProductDetailById.get('single-03')
    const composition = detail?.sections.find((section) => section.id === 'composition')
    const usage = detail?.sections.find((section) => section.id === 'usage')

    expect(detail?.sections.map((section) => section.id)).toEqual([
      'characteristics',
      'composition',
      'usage',
    ])
    expect(composition?.items).toEqual([
      'Порошок листа лотоса.',
      'Порошок боярышника.',
      'Порошок пории.',
      'Порошок семян кассии.',
      'Порошок ароматного лимона.',
      'Порошок цветков хризантемы.',
      'Порошок морских водорослей.',
      'Порошок редьки.',
      'Порошок чая улун.',
      'Порошок костянки еуриалы.',
      'Порошок дерезы китайской (годжи).',
      'Порошок кожуры мандарина (чэньпи).',
      'И другие компоненты.',
    ])
    expect(composition?.note).toBeUndefined()
    expect(usage?.sourceBlock?.text).toBe(
      'Утром один раз в день перед едой по 2–3 таблетки, запивая тёплой водой.',
    )
    expect(usage?.sourceBlock?.editorialSource).toEqual({
      labelTranslation: 'Утром один раз в день по 2–3 таблетки, запивая тёплой водой.',
      userClarification: 'перед едой',
      verificationStatus: 'requires-confirmation',
    })

    const serialized = JSON.stringify(detail)
    expect(serialized).not.toContain('5–7')
    expect(serialized).not.toContain('21–30')
    expect(serialized).not.toContain('Программа очищения')
    expect(serialized).not.toContain('Повседневное использование')
  })
})

describe('Xian Yun You product detail', () => {
  it('connects single-04 to the existing catalog product and dedicated hero', () => {
    const detail = informationProductDetailById.get('single-04')
    const product = productById.get('single-04')

    expect(detail?.screen).toBe('product-health-digestion-xian-yun-you')
    expect(product?.nameRu).toBe('Сянь Юнь Ю (Жиротопка)')
    expect(product?.nameZh).toBe('纤韵悠')
    expect(product?.image).toContain('T04_syan_yun_yu_zhirotopka')
    expect(detail?.heroImage).toEqual({
      src: '/images/zhirotopka-detail.png',
      alt: 'Упаковка Сянь Юнь Ю',
      width: 1402,
      height: 1122,
    })
    expect(informationProductDetailByScreen.get(detail!.screen)).toBe(detail)
  })

  it('uses one canonical list for all eight team observations', () => {
    const summary = informationProductDetailById.get('single-04')?.summary

    expect(summary?.intro).toBe(
      'Сянь Юнь Ю — фруктово-овощной пищевой продукт JIMON в форме прессованных жевательных таблеток. Формула сочетает порошки ягод, фруктово-овощные компоненты и пищевые волокна.',
    )
    expect(summary?.propertiesTitle).toBe('По опыту команды')
    expect(summary?.properties.map((property) => property.text)).toEqual([
      'Снижает усвоение жиров и сахара, помогает выводить жир.',
      'Улучшает работу кишечника, регулирует межклеточную жидкость.',
      'Ускоряет обмен веществ, устраняет запоры, выводит токсины.',
      'Не приводит к набору веса даже при обильной еде.',
      'Способствует очищению организма.',
      'Предотвращает болезни обмена веществ: ожирение, высокое давление, диабет, подагру, жировую печень.',
      'Поддерживает баланс кишечной микрофлоры, укрепляет иммунитет и создаёт чувство сытости.',
      'Улучшает упругость и чистоту кожи.',
    ])
    expect(
      summary?.properties.every(
        (property) => property.verificationStatus === 'requires-confirmation',
      ),
    ).toBe(true)
    expect(summary).not.toHaveProperty('sourceProperties')

    const serialized = JSON.stringify(summary)
    expect(serialized).not.toContain('Содержит фруктово-овощные компоненты.')
    expect(serialized).not.toContain('Содержит пищевые волокна.')
    expect(serialized).not.toContain('Подходит для дополнения рациона.')
    expect(serialized).not.toContain(
      'Позиционируется как пищевой продукт с пониженным содержанием сахара.',
    )
  })

  it('keeps product observations isolated and applies the shared heading standard', () => {
    const birunkan = informationProductDetailById.get('single-03')
    const xianYunYou = informationProductDetailById.get('single-04')

    expect(PRODUCT_DETAIL_PROPERTIES_TITLE).toBe('По опыту команды')
    expect(
      informationProductDetails.every(
        (detail) => detail.summary.propertiesTitle === PRODUCT_DETAIL_PROPERTIES_TITLE,
      ),
    ).toBe(true)
    expect(xianYunYou?.summary.properties).not.toBe(birunkan?.summary.properties)
    expect(birunkan?.summary.properties).toHaveLength(7)
    expect(xianYunYou?.summary.properties).toHaveLength(8)
  })

  it('provides the approved facts, all 16 ingredients and source metadata', () => {
    const detail = informationProductDetailById.get('single-04')
    const about = detail?.sections.find((section) => section.id === 'characteristics')
    const composition = detail?.sections.find((section) => section.id === 'composition')

    expect(detail?.sections.map((section) => section.id)).toEqual([
      'characteristics',
      'composition',
      'usage',
    ])
    expect(about?.facts).toEqual([
      { label: 'Название', value: 'Сянь Юнь Ю (Жиротопка) (纤韵悠)' },
      { label: 'Форма выпуска', value: 'Прессованные жевательные таблетки.' },
      { label: 'Количество', value: '30 штук.' },
      { label: 'Масса одной таблетки', value: '1 г.' },
      { label: 'Общая масса', value: '30 г.' },
      { label: 'Категория', value: 'Фруктово-овощной пищевой продукт JIMON.' },
      { label: 'Хранение', value: 'В прохладном сухом месте.' },
    ])
    expect(composition?.items).toEqual([
      'Сорбитол.',
      'Порошок клубничного сока.',
      'Порошок черники.',
      'Порошок белой фасоли.',
      'Порошок семян кассии.',
      'Порошок зелёного кофе.',
      'Порошок гриба эноки.',
      'Порошок гриба копринус.',
      'Порошок женьшеня.',
      'Порошок корня кудзу.',
      'Инулин.',
      'Аскорбиновая кислота.',
      'Овсяный бета-глюкан.',
      'Фруктоолигосахариды.',
      'Трегалоза.',
      'Стеарат магния.',
    ])
    expect(composition?.editorialNotes).toEqual([
      {
        text: 'Используется культивированный женьшень возрастом до 5 лет включительно.',
        verificationStatus: 'source-supported',
      },
    ])
  })

  it('keeps the exact usage phrase and makes the restriction available', () => {
    const usage = informationProductDetailById
      .get('single-04')
      ?.sections.find((section) => section.id === 'usage')

    expect(usage?.sourceBlock?.text).toBe(
      'Рекомендуется принимать по 1–2 таблетки в день после еды, тщательно разжёвывая.',
    )
    expect(usage?.restrictions).toEqual([
      'Продукт не предназначен для детей младше 14 лет, беременных и кормящих женщин.',
    ])

    const serialized = JSON.stringify(usage)
    expect(serialized).not.toContain('после обеда')
    expect(serialized).not.toContain('после ужина')
    expect(serialized).not.toContain('курс')
  })
})

describe('Liver peptide turmeric product detail', () => {
  it('connects single-18 to its canonical catalog product and dedicated hero', () => {
    const detail = informationProductDetailById.get('single-18')
    const product = productById.get('single-18')

    expect(detail?.screen).toBe('product-health-digestion-liver-peptide-turmeric')
    expect(product?.nameRu).toBe('Напиток для поддержки печени с пептидами и куркумой')
    expect(product?.nameZh).toBe('添然萃肝蛋白肽姜黄饮')
    expect(product?.image).toContain('T18_napitok_dlya_podderzhki_pecheni_s_kurkumoy')
    expect(product?.prices).toEqual({
      0: 599,
      10: 549,
      20: 499,
      30: 449,
      40: 399,
      50: null,
      60: null,
    })
    expect(detail?.heroImage).toEqual({
      src: '/images/pechen-peptidy-kurkuma-detail.png',
      alt: 'Упаковка напитка для поддержки печени с пептидами и куркумой',
      width: 1448,
      height: 1086,
    })
    expect(informationProductDetailByScreen.get(detail!.screen)).toBe(detail)
  })

  it('keeps the approved introduction and seven team observations in order', () => {
    const summary = informationProductDetailById.get('single-18')?.summary

    expect(summary?.intro).toBe(
      'Напиток для поддержки печени с пептидами и куркумой — растительный напиток JIMON, сочетающий пептиды печени, куркуму и комплекс растительных компонентов. Выпускается в удобных порционных саше для ежедневного употребления.',
    )
    expect(summary?.propertiesTitle).toBe(PRODUCT_DETAIL_PROPERTIES_TITLE)
    expect(summary?.properties.map((property) => property.text)).toEqual([
      'Поддерживает работу печени.',
      'Способствует очищению организма.',
      'Обладает противовоспалительными и противоопухолевыми свойствами.',
      'Улучшает обмен веществ.',
      'Укрепляет иммунитет.',
      'Снимает усталость.',
      'Помогает восстановлению организма.',
    ])
    expect(
      summary?.properties.every(
        (property) => property.verificationStatus === 'requires-confirmation',
      ),
    ).toBe(true)
  })

  it('provides the approved facts and nine main components', () => {
    const detail = informationProductDetailById.get('single-18')
    const about = detail?.sections.find((section) => section.id === 'characteristics')
    const composition = detail?.sections.find((section) => section.id === 'composition')

    expect(detail?.sections.map((section) => section.id)).toEqual([
      'characteristics',
      'composition',
      'usage',
    ])
    expect(about?.facts).toEqual([
      { label: 'Название', value: 'Напиток для поддержки печени с пептидами и куркумой' },
      { label: 'Форма выпуска', value: 'Растительный напиток в порционных саше.' },
      { label: 'Количество', value: '20 саше.' },
      { label: 'Объём одного саше', value: '25 мл.' },
      { label: 'Общий объём', value: '500 мл.' },
      { label: 'Срок хранения', value: '18 месяцев.' },
      { label: 'Категория', value: 'Растительный пищевой напиток JIMON.' },
      { label: 'Хранение', value: 'В сухом, защищённом от прямого света месте.' },
    ])
    expect(composition?.items).toEqual([
      'Пептиды белков печени — 0,3 мг на саше.',
      'Куркума — 375 мг на саше.',
      'Концентрированный сок розы Роксбурга (колючей груши).',
      'Порошок сока опунции (кактусовой груши).',
      'Концентрированный порошок артишока.',
      'Порошок семян ховении сладкой.',
      'Порошок травы пентхорума китайского.',
      'Порошок корня кудзу (пуэрарии).',
      'Порошок кукурузных рылец.',
    ])

    const serialized = JSON.stringify(composition)
    expect(serialized).not.toContain('Эритритол')
    expect(serialized).not.toContain('L-арабиноза')
    expect(serialized).not.toContain('Пищевые ароматизаторы')
  })

  it('uses the shared usage and restrictions structure without an extra section', () => {
    const usage = informationProductDetailById
      .get('single-18')
      ?.sections.find((section) => section.id === 'usage')

    expect(usage?.title).toBe('Применение')
    expect(usage?.sourceBlock?.text).toBe(
      'Рекомендуется принимать по 1 саше (25 мл) один раз в день, утром или вечером.\n\nКурс приёма — 20 дней',
    )
    expect(usage?.restrictions).toEqual([
      'Продукт не рекомендуется младенцам, детям и подросткам, беременным и кормящим женщинам',
    ])
    expect(usage).not.toHaveProperty('facts')
    expect(usage).not.toHaveProperty('items')
  })
})

describe('flax collagen porridge product detail', () => {
  it('connects single-06 to the digestion detail and dedicated hero', () => {
    const detail = informationProductDetailById.get('single-06')
    const product = productById.get('single-06')

    expect(detail?.screen).toBe('product-health-digestion-flax-collagen')
    expect(product?.nameRu).toBe('Пептидная льняная каша с коллагеном')
    expect(product?.nameZh).toBe('添然萃亚麻籽胶原蛋白肽粉固体饮料')
    expect(detail?.heroImage).toEqual({
      src: '/images/peptidnaya-lnyanaya-kasha-s-kollagenom-hero.png',
      alt: 'Упаковка пептидной льняной каши с коллагеном',
      width: 1448,
      height: 1086,
    })
    expect(informationProductDetailByScreen.get(detail!.screen)).toBe(detail)
  })

  it('provides all three modal sections in the shared order', () => {
    const detail = informationProductDetailById.get('single-06')

    expect(detail?.sections.map((section) => section.id)).toEqual([
      'characteristics',
      'composition',
      'usage',
    ])
    expect(detail?.sections.map((section) => section.label)).toEqual([
      'О продукте',
      'Состав',
      'Применение',
    ])
    expect(detail?.sections.find((section) => section.id === 'characteristics')?.facts).toHaveLength(8)
    expect(detail?.sections.find((section) => section.id === 'composition')?.items).toHaveLength(15)
    expect(detail?.sections.find((section) => section.id === 'usage')?.sourceBlock?.text).toContain('250 мл')
  })

  it('keeps the exact ten team experience statements in order', () => {
    const properties = informationProductDetailById
      .get('single-06')
      ?.summary.properties.map((property) => property.text)

    expect(properties).toEqual([
      'Способствует длительному ощущению сытости.',
      'Помогает контролировать массу тела.',
      'Поддерживает здоровую работу кишечника.',
      'Помогает снижать калорийность ежедневного рациона при замене более калорийных продуктов.',
      'Способствует улучшению пищеварения.',
      'Поддерживает естественное очищение кишечника.',
      'Способствует нормальному обмену веществ.',
      'Подходит для программ контроля веса.',
      'Помогает поддерживать нормальную микрофлору кишечника.',
      'Содержит коллагеновые пептиды и растительные питательные компоненты.',
    ])
  })

  it('keeps the detail id unique', () => {
    expect(informationProductDetails.filter((detail) => detail.productId === 'single-06')).toHaveLength(1)
    expect(new Set(informationProductDetails.map((detail) => detail.productId)).size).toBe(
      informationProductDetails.length,
    )
  })
})

describe('Syue Lan Do blood cleanse product detail', () => {
  it('connects the existing single-07 product and preserves its prices', () => {
    const detail = informationProductDetailById.get('single-07')
    const product = productById.get('single-07')

    expect(detail?.screen).toBe('product-health-heart-syue-lan-do')
    expect(product?.nameRu).toBe('Сюэ Лань До (Кровочистка)')
    expect(product?.nameZh).toBe('明日叶纳豆压片糖果')
    expect(product?.image).toContain('T07_syue_lan_do_krovochistka')
    expect(product?.prices).toEqual({
      0: 499,
      10: 464,
      20: 429,
      30: 394,
      40: 359,
      50: null,
      60: null,
    })
    expect(detail?.heroImage).toEqual({
      src: '/images/syue-lan-do-krovochistka-hero.png',
      alt: 'Синяя упаковка Сюэ Лань До (Кровочистка)',
      width: 1448,
      height: 1086,
    })
    expect(informationProductDetailByScreen.get(detail!.screen)).toBe(detail)
  })

  it('keeps the approved introduction and nine team statements verbatim', () => {
    const summary = informationProductDetailById.get('single-07')?.summary

    expect(summary?.intro).toBe(
      'Сюэ Лань До — пищевой продукт JIMON в форме прессованных таблеток на основе ангелики кейске (ашитабы), натто и комплекса растительных компонентов. Формула сочетает растительные экстракты, пищевые волокна и белковые компоненты для дополнения ежедневного рациона.',
    )
    expect(summary?.propertiesTitle).toBe(PRODUCT_DETAIL_PROPERTIES_TITLE)
    expect(summary?.properties.map((property) => property.text)).toEqual([
      'Растворяет фибриновые сгустки/тромбы.',
      'Улучшает кровообращение.',
      'Уменьшает вязкость крови (густая кровь).',
      'Снижает риски инсульта и инфаркта.',
      'Повышает энергию.',
      'Очищает сосуды — главный путь доставки питания к клеткам.',
      'Эффективен при: варикозном расширении вен, кожных высыпаниях, атопическом дерматите, псориазе, акне, аллергии и зуде, головных болях, давлении.',
      'Улучшает зрение.',
      'Оказывает лимфодренажный эффект.',
    ])
    expect(
      summary?.properties.every(
        (property) => property.verificationStatus === 'requires-confirmation',
      ),
    ).toBe(true)
  })

  it('provides the exact characteristics and composition in order', () => {
    const detail = informationProductDetailById.get('single-07')
    const about = detail?.sections.find((section) => section.id === 'characteristics')
    const composition = detail?.sections.find((section) => section.id === 'composition')

    expect(detail?.sections.map((section) => section.id)).toEqual([
      'characteristics',
      'composition',
      'usage',
    ])
    expect(about?.facts).toEqual([
      {
        label: 'Название',
        value: 'Сюэ Лань До (Кровочистка) (明日叶纳豆压片糖果).',
      },
      { label: 'Форма выпуска', value: 'Прессованные таблетки.' },
      { label: 'Количество', value: '60 таблеток.' },
      { label: 'Масса одной таблетки', value: '0,7 г.' },
      { label: 'Общая масса', value: '42 г.' },
      { label: 'Категория', value: 'Пищевой продукт JIMON.' },
      { label: 'Хранение', value: 'В сухом проветриваемом месте.' },
    ])
    expect(composition?.items).toEqual([
      'Сорбитол.',
      'Ангелика кейске (ашитаба, 明日叶).',
      'Порошок натто.',
      'Инулин.',
      'Порошок кукурузных рылец.',
      'Томатный порошок.',
      'Порошок сладкого миндаля.',
      'Порошок семян кассии (决明子).',
      'Белок земляного червя (地龙蛋白).',
      'Порошок гардении.',
      'Ксилит.',
      'Стеарат магния.',
      'Сукралоза.',
    ])
  })

  it('uses only the approved usage text and two restrictions', () => {
    const usage = informationProductDetailById
      .get('single-07')
      ?.sections.find((section) => section.id === 'usage')

    expect(usage?.sourceBlock?.text).toBe(
      'Рекомендуется принимать утром и вечером по 1–2 таблетки за один приём.',
    )
    expect(usage?.restrictions).toEqual([
      'Продукт не предназначен для младенцев, маленьких детей, беременных и кормящих женщин.',
      'Не рекомендуется при аллергии на компоненты.',
    ])
    expect(usage?.restrictions).toHaveLength(2)
  })

  it('keeps approved product details unchanged and product ids unique', () => {
    expect(informationProductDetailById.get('single-03')?.summary.properties).toHaveLength(7)
    expect(informationProductDetailById.get('single-04')?.summary.properties).toHaveLength(8)
    expect(informationProductDetailById.get('single-18')?.summary.properties).toHaveLength(7)
    expect(informationProductDetailById.get('single-06')?.summary.properties).toHaveLength(10)
    expect(informationProductDetailById.get('single-09')?.summary.properties).toHaveLength(6)
    expect(informationProductDetails.filter((detail) => detail.productId === 'single-07')).toHaveLength(1)
    expect(new Set(informationProductDetails.map((detail) => detail.productId)).size).toBe(
      informationProductDetails.length,
    )
  })
})

describe('Safora applicator product detail', () => {
  it('connects single-09 to its canonical catalog product and dedicated hero', () => {
    const detail = informationProductDetailById.get('single-09')
    const product = productById.get('single-09')

    expect(detail?.screen).toBe('product-health-vision-safora')
    expect(product?.nameRu).toBe('Карандаш Сафора')
    expect(product?.nameZh).toBe('媛韵牌苦参抑菌液')
    expect(product?.image).toContain('T09_chudo_karandash_bakteriostaticheskaya_zhidkost')
    expect(product?.prices).toEqual({
      0: 319,
      10: 279,
      20: 252,
      30: 225,
      40: 198,
      50: null,
      60: null,
    })
    expect(detail?.heroImage).toEqual({
      src: '/images/karandash-safora-detail.png',
      alt: 'Упаковка карандаша Сафора',
      width: 1448,
      height: 1086,
    })
    expect(informationProductDetailByScreen.get(detail!.screen)).toBe(detail)
  })

  it('keeps the approved introduction and six team observations in order', () => {
    const summary = informationProductDetailById.get('single-09')?.summary

    expect(summary?.intro).toBe(
      'Карандаш Сафора — растительное наружное средство JIMON в формате удобного карандаша-аппликатора. Бактериостатический раствор с натуральными растительными компонентами для наружного применения.',
    )
    expect(summary?.propertiesTitle).toBe(PRODUCT_DETAIL_PROPERTIES_TITLE)
    expect(summary?.properties.map((property) => property.text)).toEqual([
      'Улучшает микроциркуляцию крови в сосудах глаз.',
      'Подходит при сухости и переутомлении глаз, вызванных длительной работой перед экраном.',
      'Облегчает усталость глаз.',
      'Способствует восстановлению и улучшению остроты зрения.',
      'Подходит для профилактики различных глазных заболеваний.',
      'При воспалительных состояниях ЛОР-органов помогает уменьшить симптомы воспаления, облегчить дыхание и снизить болевые ощущения.',
    ])
    expect(
      summary?.properties.every(
        (property) => property.verificationStatus === 'requires-confirmation',
      ),
    ).toBe(true)
  })

  it('provides the approved product facts and five main plant components', () => {
    const detail = informationProductDetailById.get('single-09')
    const about = detail?.sections.find((section) => section.id === 'characteristics')
    const composition = detail?.sections.find((section) => section.id === 'composition')

    expect(detail?.sections.map((section) => section.id)).toEqual([
      'characteristics',
      'composition',
      'usage',
    ])
    expect(about?.facts).toEqual([
      { label: 'Название', value: 'Карандаш Сафора' },
      {
        label: 'Форма выпуска',
        value: 'Жидкость для наружного применения в карандаше-аппликаторе.',
      },
      { label: 'Объём', value: '10 мл.' },
      { label: 'Количество', value: '1 флакон.' },
      {
        label: 'Категория',
        value: 'Бактериостатический раствор для наружного применения.',
      },
      { label: 'Срок хранения', value: '2 года.' },
      { label: 'Хранение', value: 'В сухом, прохладном месте, защищённом от света.' },
    ])
    expect(composition?.items).toEqual([
      'Шафран.',
      'Софора.',
      'Цянь-ли-гуан.',
      'Семена кассии.',
      'Хризантема.',
    ])
  })

  it('uses the shared external-application and restrictions structure', () => {
    const usage = informationProductDetailById
      .get('single-09')
      ?.sections.find((section) => section.id === 'usage')

    expect(usage?.title).toBe('Применение')
    expect(usage?.sourceBlock?.text).toBe(
      'Нанести средство непосредственно на нужный участок кожи и дать высохнуть естественным образом.\n\nВремя бактериостатического действия — 2 минуты',
    )
    expect(usage?.sourceBlock?.editorialSource.verificationStatus).toBe('source-supported')
    expect(usage?.restrictions).toEqual([
      'Не принимать внутрь и не допускать случайного проглатывания.',
      'Хранить в недоступном для детей месте.',
      'Не наносить на повреждённую кожу.',
      'При повышенной чувствительности использовать с осторожностью; при появлении дискомфорта прекратить применение.',
      'Не использовать совместно с препаратами, подавляющими бактериальную активность, без консультации специалиста.',
    ])
    expect(JSON.stringify(usage)).not.toContain('глазные капли')
    expect(JSON.stringify(usage)).not.toContain('слизистые оболочки')
  })

  it('keeps the previous product details unchanged and product ids unique', () => {
    expect(informationProductDetailById.get('single-03')?.summary.properties).toHaveLength(7)
    expect(informationProductDetailById.get('single-04')?.summary.properties).toHaveLength(8)
    expect(informationProductDetailById.get('single-18')?.summary.properties).toHaveLength(7)
    expect(informationProductDetails.filter((detail) => detail.productId === 'single-09')).toHaveLength(1)
    expect(new Set(informationProductDetails.map((detail) => detail.productId)).size).toBe(
      informationProductDetails.length,
    )
  })
})

describe('bone collagen product detail', () => {
  it('connects the existing single-05 product to joints and preserves commercial data', () => {
    const detail = informationProductDetailById.get('single-05')
    const product = productById.get('single-05')

    expect(detail?.screen).toBe('product-health-joints-bone-collagen')
    expect(product?.nameRu).toBe('Пептидный костный коллаген')
    expect(product?.nameZh).toBe('骨胶原蛋白肽粉固体饮料')
    expect(product?.image).toContain('T05_kostnyy_peptidnyy_kollagen')
    expect(product?.prices).toEqual({
      0: 319,
      10: 279,
      20: 252,
      30: 225,
      40: 198,
      50: null,
      60: null,
    })
    expect(detail?.heroImage).toEqual({
      src: '/images/kostnyy-kollagen-hero.png',
      alt: 'Упаковка пептидного костного коллагена',
      width: 1448,
      height: 1086,
    })
    expect(informationProductDetailByScreen.get(detail!.screen)).toBe(detail)
  })

  it('keeps the exact introduction and nine team statements in order', () => {
    const summary = informationProductDetailById.get('single-05')?.summary

    expect(summary?.intro).toBe(
      'Пептидный костный коллаген JIMON — растворимый пищевой продукт с высоким содержанием костных коллагеновых пептидов. Формула содержит 50% коллагеновых пептидов, кокосовый порошок и трегалозу. Благодаря мелким пептидам продукт хорошо растворяется и подходит для дополнения ежедневного рациона белковыми компонентами.',
    )
    expect(summary?.propertiesTitle).toBe(PRODUCT_DETAIL_PROPERTIES_TITLE)
    expect(summary?.properties.map((property) => property.text)).toEqual([
      'Активирует клеточную регенерацию.',
      'Эффективен при артрозах, артритах, остеопорозах, остеохондрозах и язве желудка.',
      'Укрепляет кости и суставы. Эффективен при болях в суставах, копчике и позвоночнике.',
      'Восстанавливает хрящи.',
      'Повышает иммунитет.',
      'Эффективно решает проблемы выпадения волос, улучшает состояние кожи и ногтей.',
      'Поддерживает работу печени, сердца, сосудов.',
      'Быстрая регенерация при переломах, особенно у пожилых людей.',
      'Восстанавливает ткани после детоксикации, ускоряет омоложение.',
    ])
    expect(
      summary?.properties.every(
        (property) => property.verificationStatus === 'requires-confirmation',
      ),
    ).toBe(true)
  })

  it('provides the exact facts and three composition items', () => {
    const detail = informationProductDetailById.get('single-05')
    const about = detail?.sections.find((section) => section.id === 'characteristics')
    const composition = detail?.sections.find((section) => section.id === 'composition')

    expect(detail?.sections.map((section) => section.id)).toEqual([
      'characteristics',
      'composition',
      'usage',
    ])
    expect(about?.facts).toEqual([
      {
        label: 'Название',
        value: 'Пептидный костный коллаген (骨胶原蛋白肽粉固体饮料).',
      },
      { label: 'Форма выпуска', value: 'Растворимый порошковый напиток.' },
      { label: 'Количество', value: '20 пакетиков.' },
      { label: 'Масса одного пакетика', value: '10 г.' },
      { label: 'Общая масса', value: '200 г.' },
      {
        label: 'Категория',
        value: 'Пищевой продукт JIMON с костными коллагеновыми пептидами.',
      },
      {
        label: 'Хранение',
        value: 'В сухом прохладном месте, в герметично закрытой упаковке.',
      },
      { label: 'Срок годности', value: '24 месяца.' },
    ])
    expect(composition?.items).toEqual([
      'Костные коллагеновые пептиды (50%).',
      'Кокосовый порошок.',
      'Трегалоза.',
    ])
  })

  it('uses the exact preparation text and three restrictions', () => {
    const usage = informationProductDetailById
      .get('single-05')
      ?.sections.find((section) => section.id === 'usage')

    expect(usage?.sourceBlock?.text).toBe(
      '1. Высыпать содержимое одного пакетика (10 г) в чашку.\n2. Добавить приблизительно 150 мл тёплой или горячей воды.\n3. Тщательно размешать до растворения.\n\nМожно употреблять утром, в течение дня, после физической активности или перед сном.',
    )
    expect(usage?.restrictions).toEqual([
      'Не рекомендуется младенцам, беременным и кормящим женщинам.',
      'Не употреблять при индивидуальной аллергии на компоненты.',
      'Не употреблять при повреждении упаковки, постороннем запахе или признаках порчи продукта.',
    ])
  })

  it('keeps every product detail id unique and previous cards unchanged', () => {
    expect(informationProductDetailById.get('single-03')?.summary.properties).toHaveLength(7)
    expect(informationProductDetailById.get('single-04')?.summary.properties).toHaveLength(8)
    expect(informationProductDetailById.get('single-18')?.summary.properties).toHaveLength(7)
    expect(informationProductDetailById.get('single-06')?.summary.properties).toHaveLength(10)
    expect(informationProductDetailById.get('single-07')?.summary.properties).toHaveLength(9)
    expect(informationProductDetailById.get('single-09')?.summary.properties).toHaveLength(6)
    expect(informationProductDetails.filter((detail) => detail.productId === 'single-05')).toHaveLength(1)
    expect(new Set(informationProductDetails.map((detail) => detail.productId)).size).toBe(
      informationProductDetails.length,
    )
  })
})
