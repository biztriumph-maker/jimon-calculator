import type { Product } from '../../domain/types'
import type { Screen } from '../../storage/appStorage'

export type ProductDetailSectionId = 'characteristics' | 'composition' | 'usage'
export type ProductDetailVerificationStatus = 'requires-confirmation' | 'source-supported'

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
  sourceProperties?: readonly ProductDetailProperty[]
}

export interface ProductDetailEditorialNote {
  text: string
  verificationStatus: ProductDetailVerificationStatus
}

export interface ProductDetailSourceBlock {
  text: string
  editorialSource: {
    labelTranslation: string
    userClarification?: string
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
  restrictions?: readonly string[]
  editorialNotes?: readonly ProductDetailEditorialNote[]
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
  {
    productId: 'single-04',
    screen: 'product-health-digestion-xian-yun-you',
    heroImage: {
      src: '/images/zhirotopka-detail.png',
      alt: 'Упаковка Сянь Юнь Ю',
      width: 1402,
      height: 1122,
    },
    summary: {
      intro:
        'Сянь Юнь Ю — фруктово-овощной пищевой продукт JIMON в форме прессованных жевательных таблеток. Формула сочетает порошки ягод, фруктово-овощные компоненты и пищевые волокна.',
      propertiesTitle: 'Свойства',
      properties: [
        {
          text: 'Содержит фруктово-овощные компоненты.',
          verificationStatus: 'source-supported',
        },
        { text: 'Содержит пищевые волокна.', verificationStatus: 'source-supported' },
        { text: 'Подходит для дополнения рациона.', verificationStatus: 'source-supported' },
        {
          text: 'Позиционируется как пищевой продукт с пониженным содержанием сахара.',
          verificationStatus: 'source-supported',
        },
      ],
      sourceProperties: [
        {
          text: 'Снижает усвоение жиров и сахара, помогает выводить жир.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Улучшает работу кишечника, регулирует межклеточную жидкость.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Ускоряет обмен веществ, устраняет запоры, выводит токсины.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Не приводит к набору веса даже при обильной еде.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Способствует очищению организма.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Предотвращает болезни обмена веществ: ожирение, высокое давление, диабет, подагру, жировую печень.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Поддерживает баланс кишечной микрофлоры, укрепляет иммунитет и создаёт чувство сытости.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Улучшает упругость и чистоту кожи.',
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
          { label: 'Название', value: 'Сянь Юнь Ю (Жиротопка) (纤韵悠)' },
          { label: 'Форма выпуска', value: 'Прессованные жевательные таблетки.' },
          { label: 'Количество', value: '30 штук.' },
          { label: 'Масса одной таблетки', value: '1 г.' },
          { label: 'Общая масса', value: '30 г.' },
          { label: 'Категория', value: 'Фруктово-овощной пищевой продукт JIMON.' },
          { label: 'Хранение', value: 'В прохладном сухом месте.' },
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
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
        ],
        editorialNotes: [
          {
            text: 'Используется культивированный женьшень возрастом до 5 лет включительно.',
            verificationStatus: 'source-supported',
          },
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: 'Рекомендуется принимать по 1–2 таблетки в день после еды, тщательно разжёвывая.',
          editorialSource: {
            labelTranslation:
              'Рекомендуется принимать по 1–2 таблетки в день после еды, тщательно разжёвывая.',
            verificationStatus: 'source-supported',
          },
        },
        restrictions: [
          'Продукт не предназначен для детей младше 14 лет, беременных и кормящих женщин.',
        ],
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
