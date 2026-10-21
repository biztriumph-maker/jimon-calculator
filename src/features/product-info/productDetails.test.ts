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
