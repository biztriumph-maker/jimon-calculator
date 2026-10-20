import type { Product } from '../../domain/types'
import type { Screen } from '../../storage/appStorage'

export type ProductDetailSectionId = 'characteristics' | 'composition' | 'usage'
export type ProductDetailVerificationStatus = 'requires-confirmation'

export interface ProductDetailFact {
  label: string
  value: string
}

export interface ProductDetailProperty {
  text: string
  verificationStatus: ProductDetailVerificationStatus
}

export interface ProductDetailSummary {
  intro: string
  propertiesTitle: string
  properties: readonly ProductDetailProperty[]
}

export interface ProductDetailSourceBlock {
  text: string
  editorialSource: {
    labelTranslation: string
    userClarification: string
    verificationStatus: ProductDetailVerificationStatus
  }
}

export interface ProductDetailSection {
  id: ProductDetailSectionId
  label: string
  title: string
  facts?: readonly ProductDetailFact[]
  items?: readonly string[]
  sourceBlock?: ProductDetailSourceBlock
  note?: string
}
export interface ProductDetailHeroImage {
  src: string
  alt: string
  width: number
  height: number
}

export interface ProductDetailConfig {
  productId: Product['id']
  screen: Screen
  heroImage?: ProductDetailHeroImage
  summary: ProductDetailSummary
  sections: readonly ProductDetailSection[]
}

export const informationProductDetails: readonly ProductDetailConfig[] = [
  {
    productId: 'single-03',
    screen: 'product-health-digestion-birunkan',
    heroImage: {
      src: '/images/birunkan-detail.png',
      alt: 'Упаковка Бирункана',
      width: 984,
      height: 793,
    },
    summary: {
      intro:
        'Бирункан — растительный пищевой продукт JIMON в форме прессованных жевательных таблеток с листом лотоса, боярышником и другими растительными компонентами.',
      propertiesTitle: 'Свойства',
      properties: [
        { text: 'Мягкая детоксикация организма.', verificationStatus: 'requires-confirmation' },
        { text: 'Снижение и контроль веса.', verificationStatus: 'requires-confirmation' },
        { text: 'Уменьшает отёки, выводит избыточную жидкость.', verificationStatus: 'requires-confirmation' },
        {
          text: 'Способствует очистке кишечника и нормализации обмена веществ.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Укрепляет печень и селезёнку.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Способствует устранению воспалительных процессов в организме.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Способствует нормализации и поддержанию микрофлоры кишечника.',
          verificationStatus: 'requires-confirmation',
        },
      ],
    },
    sections: [
      {
        id: 'characteristics',
        label: 'О продукте',
        title: 'О продукте',
        facts: [
          { label: 'Название', value: 'Бирункан (碧润康)' },
          { label: 'Форма выпуска', value: 'Прессованные жевательные таблетки.' },
          { label: 'Количество', value: '30 штук.' },
          { label: 'Масса одной таблетки', value: '0,7 г.' },
          { label: 'Общая масса', value: '21 г.' },
          { label: 'Срок хранения', value: '24 месяца.' },
          { label: 'Категория', value: 'Растительный пищевой продукт JIMON.' },
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
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
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: 'Утром один раз в день перед едой по 2–3 таблетки, запивая тёплой водой.',
          editorialSource: {
            labelTranslation: 'Утром один раз в день по 2–3 таблетки, запивая тёплой водой.',
            userClarification: 'перед едой',
            verificationStatus: 'requires-confirmation',
          },
        },
      },
    ],
  },
]

export const informationProductDetailById = new Map(
  informationProductDetails.map((detail) => [detail.productId, detail]),
)

export const informationProductDetailByScreen = new Map(
  informationProductDetails.map((detail) => [detail.screen, detail]),
)
