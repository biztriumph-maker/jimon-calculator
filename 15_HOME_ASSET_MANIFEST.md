# 15_HOME_ASSET_MANIFEST.md

# JIMON Calculator — Home Screen Asset Manifest

## Цель

Зафиксировать, какие графические элементы разрешены на Главном экране, и исключить импровизацию Codex.

Primary reference:
- `01_APPROVED_UI_3_SCREENS.png`

Normalized comparison reference:
- `JIMON_HOME_REFERENCE_390.png`

---

## 1. Обязательные assets

| Asset | Требование | Статус до аудита Codex |
|---|---|---|
| JIMON logo | круглый золото-зелёный знак + `JIMON`, без `GROUP` | FIND EXACT |
| Home landscape | те же горы/долина/верхняя листва, что в reference | FIND EXACT |
| Newcomer icon | белый лист на зелёном круге/форме, как в reference | FIND EXACT |
| Partner icon | зелёный силуэт человека | FIND EXACT |
| Prices icon | зелёный бриллиант | FIND EXACT |
| Rules icon | зелёный щит + белая галочка | FIND EXACT |
| Mobile icon | зелёное сердце | FIND EXACT |
| Chevron right | тонкая зелёная стрелка вправо | can use exact SVG if visually matching |

---

## 2. Разрешённые форматы

Приоритет:
1. SVG для простых иконок.
2. PNG/WebP для сложного брендинга и landscape.
3. Не использовать emoji.

---

## 3. Asset inventory, который обязан сделать Codex

До изменения JSX/CSS:

1. Найти все изображения в проекте:
   - `src/assets/**`
   - `public/**`
   - локальные imports в Home/Main screen
2. Для каждого кандидата указать:
   - path;
   - dimensions;
   - format;
   - где используется;
   - насколько совпадает с approved reference.
3. Отдельно показать:
   - `EXACT MATCH`
   - `POSSIBLE MATCH`
   - `MISSING`

---

## 4. Критическое правило hero

Если exact landscape отсутствует:

**НЕ СОЗДАВАТЬ НОВЫЕ ГОРЫ.**

В отчёте написать:

`MISSING_EXACT_HOME_BACKGROUND`

После этого остановить именно замену hero-фона и продолжать только те элементы, которые можно сделать без изменения эталона.

---

## 5. Запрещено

- stock mountain background;
- Unsplash/Pexels;
- генеративная замена;
- CSS mountains;
- случайные Lucide icons вместо утверждённых;
- градиент вместо landscape;
- декоративные растения, которых нет в макете.

---

## 6. Имена после утверждения

Рекомендуемая структура:

```text
src/assets/brand/
  jimon-logo-home.*

src/assets/ui/home/
  home-landscape.*
  newcomer.*
  partner.*
  benefit-prices.*
  benefit-rules.*
  benefit-mobile.*
  chevron-right.svg
```

Не создавать дубликаты, если точные файлы уже существуют.
