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
    productId: 'single-05',
    screen: 'product-health-joints-bone-collagen',
    heroImage: {
      src: '/images/kostnyy-kollagen-hero.png',
      alt: 'Упаковка пептидного костного коллагена',
      width: 1448,
      height: 1086,
    },
    summary: {
      intro:
        'Пептидный костный коллаген JIMON — растворимый пищевой продукт с высоким содержанием костных коллагеновых пептидов. Формула содержит 50% коллагеновых пептидов, кокосовый порошок и трегалозу. Благодаря мелким пептидам продукт хорошо растворяется и подходит для дополнения ежедневного рациона белковыми компонентами.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        {
          text: 'Активирует клеточную регенерацию.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Эффективен при артрозах, артритах, остеопорозах, остеохондрозах и язве желудка.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Укрепляет кости и суставы. Эффективен при болях в суставах, копчике и позвоночнике.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Восстанавливает хрящи.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Повышает иммунитет.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Эффективно решает проблемы выпадения волос, улучшает состояние кожи и ногтей.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Поддерживает работу печени, сердца, сосудов.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Быстрая регенерация при переломах, особенно у пожилых людей.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Восстанавливает ткани после детоксикации, ускоряет омоложение.',
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
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
          'Костные коллагеновые пептиды (50%).',
          'Кокосовый порошок.',
          'Трегалоза.',
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: '1. Высыпать содержимое одного пакетика (10 г) в чашку.\n2. Добавить приблизительно 150 мл тёплой или горячей воды.\n3. Тщательно размешать до растворения.\n\nМожно употреблять утром, в течение дня, после физической активности или перед сном.',
          editorialSource: {
            labelTranslation:
              'Высыпать содержимое одного пакетика (10 г) в чашку, добавить приблизительно 150 мл тёплой или горячей воды и тщательно размешать до растворения. Можно употреблять утром, в течение дня, после физической активности или перед сном.',
            verificationStatus: 'source-supported',
          },
        },
        restrictions: [
          'Не рекомендуется младенцам, беременным и кормящим женщинам.',
          'Не употреблять при индивидуальной аллергии на компоненты.',
          'Не употреблять при повреждении упаковки, постороннем запахе или признаках порчи продукта.',
        ],
      },
    ],
  },
  {
    productId: 'single-06',
    screen: 'product-health-digestion-flax-collagen',
    heroImage: {
      src: '/images/peptidnaya-lnyanaya-kasha-s-kollagenom-hero.png',
      alt: 'Упаковка пептидной льняной каши с коллагеном',
      width: 1448,
      height: 1086,
    },
    summary: {
      intro:
        'Пептидная льняная каша с коллагеном — сухой растворимый пищевой продукт JIMON на основе семян льна, пептидов костного коллагена, злаков и растительных компонентов. Выпускается в порционных саше для быстрого приготовления напитка.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        {
          text: 'Способствует длительному ощущению сытости.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Помогает контролировать массу тела.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Поддерживает здоровую работу кишечника.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Помогает снижать калорийность ежедневного рациона при замене более калорийных продуктов.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Способствует улучшению пищеварения.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Поддерживает естественное очищение кишечника.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Способствует нормальному обмену веществ.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Подходит для программ контроля веса.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Помогает поддерживать нормальную микрофлору кишечника.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Содержит коллагеновые пептиды и растительные питательные компоненты.',
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
          { label: 'Название', value: 'Пептидная льняная каша с коллагеном' },
          {
            label: 'Форма выпуска',
            value: 'Порошкообразный растворимый пищевой продукт в порционных саше.',
          },
          { label: 'Количество', value: '10 саше.' },
          { label: 'Масса одного саше', value: '30 г.' },
          { label: 'Масса нетто', value: '300 г.' },
          { label: 'Категория', value: 'Сухая смесь для приготовления напитка.' },
          { label: 'Срок хранения', value: '18 месяцев.' },
          { label: 'Хранение', value: 'В прохладном сухом месте.' },
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
          'Порошок из термообработанных семян льна.',
          'Порошок пептидов костного коллагена.',
          'Эритрит.',
          'Овсяная мука.',
          'Кристаллическая фруктоза.',
          'Порошок татарской гречихи.',
          'Порошок корня пуэрарии.',
          'Трегалоза.',
          'Ксантановая камедь.',
          'Мука из киноа.',
          'Порошок пории кокосовидной.',
          'Порошок белой фасоли.',
          'L-арабиноза.',
          'Дрожжевой экстракт.',
          'Витамин E.',
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: 'Содержимое 1 саше постепенно добавить примерно в 250 мл холодной или тёплой воды и тщательно размешать до однородности.',
          editorialSource: {
            labelTranslation:
              'Содержимое 1 саше добавить примерно в 250 мл холодной или тёплой воды, перемешивая до однородности.',
            verificationStatus: 'source-supported',
          },
        },
        restrictions: [
          'Продукт содержит пищевые волокна; после употребления рекомендуется пить достаточно воды.',
          'Содержит орехи или продукты их переработки, а также злаки, содержащие глютен. При аллергии употреблять с осторожностью.',
        ],
      },
    ],
  },
  {
    productId: 'single-07',
    screen: 'product-health-heart-syue-lan-do',
    heroImage: {
      src: '/images/syue-lan-do-krovochistka-hero.png',
      alt: 'Синяя упаковка Сюэ Лань До (Кровочистка)',
      width: 1448,
      height: 1086,
    },
    summary: {
      intro:
        'Сюэ Лань До — пищевой продукт JIMON в форме прессованных таблеток на основе ангелики кейске (ашитабы), натто и комплекса растительных компонентов. Формула сочетает растительные экстракты, пищевые волокна и белковые компоненты для дополнения ежедневного рациона.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        {
          text: 'Растворяет фибриновые сгустки/тромбы.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Улучшает кровообращение.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Уменьшает вязкость крови (густая кровь).',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Снижает риски инсульта и инфаркта.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Повышает энергию.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Очищает сосуды — главный путь доставки питания к клеткам.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Эффективен при: варикозном расширении вен, кожных высыпаниях, атопическом дерматите, псориазе, акне, аллергии и зуде, головных болях, давлении.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Улучшает зрение.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Оказывает лимфодренажный эффект.',
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
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
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
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: 'Рекомендуется принимать утром и вечером по 1–2 таблетки за один приём.',
          editorialSource: {
            labelTranslation:
              'Рекомендуется принимать утром и вечером по 1–2 таблетки за один приём.',
            verificationStatus: 'requires-confirmation',
          },
        },
        restrictions: [
          'Продукт не предназначен для младенцев, маленьких детей, беременных и кормящих женщин.',
          'Не рекомендуется при аллергии на компоненты.',
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
  {
    productId: 'single-15',
    screen: 'product-health-digestion-czinmu',
    heroImage: {
      src: '/images/tsikoriy-pressovannye-tabletki-hero.png',
      alt: 'Розовая упаковка прессованных конфет «Цзиньму» с цикорием',
      width: 1448,
      height: 1086,
    },
    summary: {
      intro:
        '«Цзиньму» JIMON — пищевой продукт в форме прессованных таблеток на основе цикория и корневища купены (хуанцзин). Формула сочетает растительные компоненты, традиционно используемые в китайском питании, и предназначена для дополнения ежедневного рациона.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        {
          text: 'Укрепление иммунитета. Повышает устойчивость организма к вирусам, бактериям и простудным заболеваниям.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Противовирусная и антибактериальная защита. Обладает противовирусными и антибактериальными свойствами, препятствует размножению патогенных микроорганизмов.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Поддержка здорового пищеварения. Способствует улучшению микрофлоры кишечника, нормализации пищеварения и мягкой регуляции работы кишечника.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Поддержка печени и детоксикация. Способствует защите клеток печени, помогает выводить токсины и поддерживает природные процессы детоксикации.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Повышение жизненного тонуса и выносливости. Снижает усталость, повышает энергию и работоспособность, улучшает общее самочувствие.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Иммуномодулирующее действие. Регулирует и поддерживает работу иммунной системы, помогает организму адаптироваться к неблагоприятным воздействиям.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Профилактика и поддержка при раке. Обладает противоопухолевой активностью, способствует защите и восстановлению организма.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Защита от излучения и окислительного стресса. Снижает вредное воздействие излучения, обладает антиоксидантными свойствами, защищает клетки от повреждений.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Поддержка роста волос и их потемнения. Способствует укреплению корней волос, стимулирует их рост и помогает замедлять процессы поседения.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Противовоспалительное действие. Помогает уменьшать воспаление в организме, поддерживает здоровье суставов и других тканей.',
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
          {
            label: 'Название',
            value: '«Цзиньму» — прессованные конфеты с цикорием (菊苣压片糖果)',
          },
          { label: 'Форма выпуска', value: 'Прессованные таблетки.' },
          { label: 'Количество', value: '90 таблеток.' },
          { label: 'Масса одной таблетки', value: '0,9 г.' },
          { label: 'Общая масса', value: '81 г.' },
          {
            label: 'Категория',
            value: 'Пищевой продукт JIMON на основе растительных компонентов.',
          },
          { label: 'Хранение', value: 'В сухом, хорошо проветриваемом месте.' },
          { label: 'Срок годности', value: '24 месяца.' },
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
          'Мальтит.',
          'Порошок цикория.',
          'Порошок корневища купены (хуанцзин, 黄精).',
          'Пищевой кукурузный крахмал.',
          'Порошок конжака.',
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: 'Принимать два раза в день по 1–2 таблетки, запивая тёплой водой.',
          editorialSource: {
            labelTranslation:
              'Принимать два раза в день по 1–2 таблетки, запивая тёплой водой.',
            verificationStatus: 'source-supported',
          },
        },
        restrictions: [
          'Не употреблять при индивидуальной непереносимости компонентов.',
          'При повреждении упаковки или признаках порчи продукт не употреблять.',
        ],
      },
    ],
  },
  {
    productId: 'single-16',
    screen: 'product-health-baoqin',
    heroImage: {
      src: '/images/baoqin-hero.png',
      alt: 'Голубая упаковка и белая баночка продукта Баоцин',
      width: 1536,
      height: 1024,
    },
    summary: {
      intro:
        'Баоцин JIMON — пищевой продукт в форме прессованных таблеток на основе пептидов бычьего костного мозга и комплекса питательных компонентов. Формула сочетает пептиды костного мозга и пептиды бычьего происхождения, разработана для дополнения ежедневного рациона и питательной поддержки организма.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        {
          text: 'Для поддержки иммунитета. Способствует укреплению защитных сил организма, повышает устойчивость к инфекциям и вирусам.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'При проблемах с костями и суставами. Поддерживает здоровье костей и суставов, способствует восстановлению хрящевой ткани, уменьшает дискомфорт и скованность.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'При усталости и снижении энергии. Помогает восстановить силы, повышает работоспособность и выносливость, улучшает общее самочувствие.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'В период восстановления после болезней и нагрузок. Ускоряет восстановление организма, поддерживает регенерацию тканей и жизненный тонус.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Для людей старшего возраста. Способствует поддержанию костной плотности и подвижности суставов, помогает замедлять процессы старения.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'При снижении памяти и концентрации. Поддерживает работу мозга, улучшает память, концентрацию внимания и когнитивные функции.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'При повышенных умственных и физических нагрузках. Способствует сохранению ресурсов организма, помогает справляться со стрессом и переутомлением.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Для поддержки здоровья кроветворной системы. Способствует нормальному кроветворению и улучшению состава крови.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Для улучшения состояния кожи, волос и ногтей. Способствует питанию клеток, повышает эластичность кожи, укрепляет волосы и ногти.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Для общего укрепления организма. Способствует поддержанию баланса жизненно важных систем и улучшению качества жизни.',
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
          {
            label: 'Название',
            value:
              'Баоцин — прессованные таблетки с пептидами костного мозга КРС (葆青 · 牛骨髓肽压片糖果).',
          },
          { label: 'Форма выпуска', value: 'Прессованные таблетки.' },
          { label: 'Количество', value: '90 таблеток.' },
          { label: 'Масса одной таблетки', value: '0,9 г.' },
          { label: 'Общая масса', value: '81 г.' },
          {
            label: 'Категория',
            value: 'Пищевой продукт JIMON на основе пептидов костного мозга.',
          },
          { label: 'Хранение', value: 'В сухом, хорошо проветриваемом месте.' },
          { label: 'Срок годности', value: '24 месяца.' },
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
          'Мальтит.',
          'Порошок пептидов бычьего костного мозга.',
          'Пищевой кукурузный крахмал.',
          'Порошок пептидов бычьего происхождения (牛鞭肽粉).',
          'Порошок конжака.',
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: 'Принимать 2 раза в день по 1–2 таблетки, запивая тёплой водой.',
          editorialSource: {
            labelTranslation:
              'Принимать 2 раза в день по 1–2 таблетки, запивая тёплой водой.',
            verificationStatus: 'source-supported',
          },
        },
        restrictions: [
          'Не употреблять при индивидуальной непереносимости компонентов.',
          'Не употреблять при повреждении упаковки или признаках порчи продукта.',
        ],
      },
    ],
  },
  {
    productId: 'single-19',
    screen: 'product-health-digestion-luohan-guo',
    heroImage: {
      src: '/images/luohan-guo-napitok-hero.png',
      alt: 'Бело-фиолетовая упаковка напитка Луо Хань Го',
      width: 1448,
      height: 1086,
    },
    summary: {
      intro:
        'Луо Хань Го JIMON — растительный напиток на основе воды, плодов луо хань го и комплекса растительных компонентов. Формула сочетает луо хань го, юйчжу, жимолость, женьшень и периллу. Продукт ориентирован на поддержку комфорта пищеварения и баланса желудочно-кишечного тракта.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        {
          text: 'Поддерживает комфорт желудка и кишечника.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Способствует балансу микрофлоры.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Поддерживает полезные бактерии кишечника.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Помогает сохранять комфорт после приёма пищи.',
          verificationStatus: 'requires-confirmation',
        },
        {
          text: 'Способствует уменьшению воспалительных процессов в желудочно-кишечном тракте и быстрому восстановлению слизистых оболочек.',
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
          {
            label: 'Название',
            value:
              'Луо Хань Го — напиток для поддержки желудка и пищеварительной системы (罗汉果植物饮料).',
          },
          { label: 'Форма выпуска', value: 'Растительный напиток.' },
          { label: 'Количество', value: '2 флакона.' },
          { label: 'Объём одного флакона', value: '50 мл.' },
          { label: 'Общий объём', value: '100 мл.' },
          { label: 'Категория', value: 'Растительный напиток JIMON.' },
          {
            label: 'Хранение',
            value:
              'Хранить плотно закрытым в прохладном, сухом и хорошо проветриваемом месте.',
          },
          { label: 'Срок годности', value: '18 месяцев.' },
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
          'Вода.',
          'Луо Хань Го.',
          'Юйчжу (玉竹).',
          'Жимолость (金银花).',
          'Женьшень (искусственно культивированный).',
          'Перилла (紫苏).',
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: '1. Продукт выпускается в формате готового растительного напитка.\n2. Один флакон содержит 50 мл.\n3. Употреблять как порционный напиток в рамках ежедневного рациона.',
          editorialSource: {
            labelTranslation:
              'Продукт выпускается в формате готового растительного напитка. Один флакон содержит 50 мл. Употреблять как порционный напиток в рамках ежедневного рациона.',
            verificationStatus: 'source-supported',
          },
        },
        restrictions: [
          'Не употреблять при индивидуальной непереносимости компонентов.',
          'Не употреблять при повреждении упаковки.',
        ],
      },
    ],
  },
  {
    productId: 'single-22',
    screen: 'product-health-digestion-dendrobium-ginseng',
    heroImage: {
      src: '/images/dendrobium-ginseng-powder-hero.png',
      alt: 'Упаковка тонизирующего напитка с женьшенем и дендробиумом',
      width: 1536,
      height: 1024,
    },
    summary: {
      intro:
        'Тонизирующий напиток с женьшенем и дендробиумом JIMON — растворимый растительный напиток на основе зародышей дендробиума и женьшеня. Формула сочетает традиционные растительные компоненты китайского питания и предназначена для дополнения ежедневного рациона, поддержания пищеварительного комфорта и общего тонуса организма.',
      propertiesTitle: PRODUCT_DETAIL_PROPERTIES_TITLE,
      properties: [
        { text: 'Защита и восстановление слизистой желудка. Помогает поддерживать защитный барьер желудка, способствует восстановлению слизистой и её естественному обновлению.', verificationStatus: 'requires-confirmation' },
        { text: 'Поддержка работы желудка и пищеварения. Способствует нормальной работе желудка, помогает улучшить пищеварительный комфорт и общее состояние ЖКТ.', verificationStatus: 'requires-confirmation' },
        { text: 'Улучшение моторики желудка и кишечника. Поддерживает естественную перистальтику, помогает уменьшить вздутие, чувство тяжести и дискомфорт после еды.', verificationStatus: 'requires-confirmation' },
        { text: 'Комфорт при повышенной кислотности. Помогает смягчить неприятные ощущения в желудке и облегчить дискомфорт, связанный с избытком желудочной кислоты.', verificationStatus: 'requires-confirmation' },
        { text: 'Поддержка ЖКТ при пищевой и алкогольной нагрузке. Подходит для дополнительной поддержки желудка и пищеварения во время застолий, при употреблении алкоголя и тяжёлой пищи.', verificationStatus: 'requires-confirmation' },
      ],
    },
    sections: [
      {
        id: 'characteristics',
        label: 'О продукте',
        title: 'О продукте',
        facts: [
          { label: 'Название', value: 'Тонизирующий напиток с женьшенем и дендробиумом (石斛胚芽人参粉固体饮料).' },
          { label: 'Форма выпуска', value: 'Растворимый порошковый напиток.' },
          { label: 'Количество', value: '20 пакетиков.' },
          { label: 'Масса одного пакетика', value: '2 г.' },
          { label: 'Общая масса', value: '40 г.' },
          { label: 'Категория', value: 'Растительный пищевой продукт JIMON.' },
          { label: 'Хранение', value: 'В сухом, хорошо проветриваемом месте.' },
        ],
      },
      {
        id: 'composition',
        label: 'Состав',
        title: 'Состав',
        items: [
          'Зародыши дендробиума.',
          'Женьшень (искусственно выращенный, возраст растения до 5 лет).',
          'Хайпи (海皮).',
          'Коричневый сахар.',
          'Гидрокарбонат натрия.',
        ],
      },
      {
        id: 'usage',
        label: 'Применение',
        title: 'Применение',
        sourceBlock: {
          text: '1. Высыпать содержимое одного пакетика в чашку.\n2. Добавить 300 мл кипятка.\n3. Размешать и дать настояться примерно 10 минут.\n\nРекомендуемое употребление:\nПо одному пакетику 2 раза в день. Производитель указывает употребление натощак.',
          editorialSource: {
            labelTranslation: 'Высыпать содержимое одного пакетика в чашку, добавить 300 мл кипятка, размешать и дать настояться примерно 10 минут. По одному пакетику 2 раза в день.',
            verificationStatus: 'source-supported',
          },
        },
        restrictions: [
          'Не рекомендуется беременным и кормящим женщинам.',
          'Не предназначен для младенцев и детей младше 14 лет.',
          'Не употреблять при индивидуальной непереносимости компонентов.',
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
