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
}

export const PRODUCT_DETAIL_PROPERTIES_TITLE = 'По опыту команды'

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
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
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
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
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
  {
    productId: 'single-18',
    screen: 'product-health-digestion-liver-peptide-turmeric',
    heroImage: {
      src: '/images/pechen-peptidy-kurkuma-detail.png',
      alt: 'Упаковка напитка для поддержки печени с пептидами и куркумой',
      width: 1448,
      height: 1086,
    },
    summary: {
      intro:
        'Напиток для поддержки печени с пептидами и куркумой — растительный напиток JIMON, сочетающий пептиды печени, куркуму и комплекс растительных компонентов. Выпускается в удобных порционных саше для ежедневного употребления.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        { text: 'Поддерживает работу печени.', verificationStatus: 'requires-confirmation' },
        { text: 'Способствует очищению организма.', verificationStatus: 'requires-confirmation' },
        {
          text: 'Обладает противовоспалительными и противоопухолевыми свойствами.',
          verificationStatus: 'requires-confirmation',
        },
        { text: 'Улучшает обмен веществ.', verificationStatus: 'requires-confirmation' },
        { text: 'Укрепляет иммунитет.', verificationStatus: 'requires-confirmation' },
        { text: 'Снимает усталость.', verificationStatus: 'requires-confirmation' },
        {
          text: 'Помогает восстановлению организма.',
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
          { label: 'Название', value: 'Напиток для поддержки печени с пептидами и куркумой' },
          { label: 'Форма выпуска', value: 'Растительный напиток в порционных саше.' },
          { label: 'Количество', value: '20 саше.' },
          { label: 'Объём одного саше', value: '25 мл.' },
          { label: 'Общий объём', value: '500 мл.' },
          { label: 'Срок хранения', value: '18 месяцев.' },
          { label: 'Категория', value: 'Растительный пищевой напиток JIMON.' },
          { label: 'Хранение', value: 'В сухом, защищённом от прямого света месте.' },
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
          'Пептиды белков печени — 0,3 мг на саше.',
          'Куркума — 375 мг на саше.',
          'Концентрированный сок розы Роксбурга (колючей груши).',
          'Порошок сока опунции (кактусовой груши).',
          'Концентрированный порошок артишока.',
          'Порошок семян ховении сладкой.',
          'Порошок травы пентхорума китайского.',
          'Порошок корня кудзу (пуэрарии).',
          'Порошок кукурузных рылец.',
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: 'Рекомендуется принимать по 1 саше (25 мл) один раз в день, утром или вечером.\n\nКурс приёма — 20 дней',
          editorialSource: {
            labelTranslation:
              'Рекомендуется принимать по 1 саше (25 мл) один раз в день, утром или вечером. Курс приёма — 20 дней',
            verificationStatus: 'requires-confirmation',
          },
        },
        restrictions: [
          'Продукт не рекомендуется младенцам, детям и подросткам, беременным и кормящим женщинам',
        ],
      },
    ],
  },
  {
    productId: 'single-09',
    screen: 'product-health-vision-safora',
    heroImage: {
      src: '/images/karandash-safora-detail.png',
      alt: 'Упаковка карандаша Сафора',
      width: 1448,
      height: 1086,
    },
    summary: {
      intro:
        'Карандаш Сафора — растительное наружное средство JIMON в формате удобного карандаша-аппликатора. Бактериостатический раствор с натуральными растительными компонентами для наружного применения.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        {
          text: 'Улучшает микроциркуляцию крови в сосудах глаз.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Подходит при сухости и переутомлении глаз, вызванных длительной работой перед экраном.',
          verificationStatus: 'requires-confirmation',
        },
        { text: 'Облегчает усталость глаз.', verificationStatus: 'requires-confirmation' },
        {
          text: 'Способствует восстановлению и улучшению остроты зрения.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Подходит для профилактики различных глазных заболеваний.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'При воспалительных состояниях ЛОР-органов помогает уменьшить симптомы воспаления, облегчить дыхание и снизить болевые ощущения.',
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
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: ['Шафран.', 'Софора.', 'Цянь-ли-гуан.', 'Семена кассии.', 'Хризантема.'],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: 'Нанести средство непосредственно на нужный участок кожи и дать высохнуть естественным образом.\n\nВремя бактериостатического действия — 2 минуты',
          editorialSource: {
            labelTranslation:
              'Нанести средство непосредственно на нужный участок кожи и дать высохнуть естественным образом. Время бактериостатического действия — 2 минуты',
            verificationStatus: 'source-supported',
          },
        },
        restrictions: [
          'Не принимать внутрь и не допускать случайного проглатывания.',
          'Хранить в недоступном для детей месте.',
          'Не наносить на повреждённую кожу.',
          'При повышенной чувствительности использовать с осторожностью; при появлении дискомфорта прекратить применение.',
          'Не использовать совместно с препаратами, подавляющими бактериальную активность, без консультации специалиста.',
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
