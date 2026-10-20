import { describe, expect, it } from 'vitest'
import { productById } from '../../data/catalog'
import {
  informationProductDetailById,
  informationProductDetailByScreen,
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
    expect(detail?.summary.propertiesTitle).toBe('Свойства')
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
