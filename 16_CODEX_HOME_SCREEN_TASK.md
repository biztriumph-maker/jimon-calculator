# 16_CODEX_HOME_SCREEN_TASK.md

# CODEX TASK — JIMON Calculator
## Главный экран: visual lock pass 1

Работаем ТОЛЬКО с Главным экраном.

Расчётную логику, товары, цены, скидки, товарооборот, курьера, каталог, план покупок и тесты расчётов НЕ ТРОГАТЬ.

---

## SOURCE OF TRUTH

Обязательные файлы:

1. `01_APPROVED_UI_3_SCREENS.png`
2. `JIMON_HOME_REFERENCE_390.png`
3. `14_UI_VISUAL_CONTRACT.md`
4. `15_HOME_ASSET_MANIFEST.md`

Первый экран approved mockup — жёсткий визуальный эталон.

---

## PHASE A — READ ONLY

Сначала ничего не меняй.

### A1. Git
Покажи:
- current branch;
- `git status --short`;
- current HEAD.

Если рабочее дерево содержит чужие изменения — НЕ удаляй их и не reset'ь.

### A2. Найди текущий Главный экран

Покажи:
- component path;
- CSS/style path;
- route;
- все imports assets, которые относятся к нему.

### A3. Asset inventory

По `15_HOME_ASSET_MANIFEST.md` найди:
- exact logo;
- exact landscape;
- newcomer icon;
- partner icon;
- diamond;
- shield/check;
- heart;
- chevron.

Для каждого:
- path;
- dimensions;
- format;
- EXACT / POSSIBLE / MISSING.

### A4. Scope report

Перед изменениями выведи:

```text
FILES I WILL CHANGE:
...

FILES I WILL NOT TOUCH:
...
```

В `FILES I WILL NOT TOUCH` явно включи всё, связанное с:
- calculation;
- products;
- pricing;
- discount rules;
- turnover;
- courier;
- catalog logic;
- tests.

---

## STOP CONDITION

Если exact home landscape/background отсутствует:

напиши:

`MISSING_EXACT_HOME_BACKGROUND`

Не заменяй его новым придуманным background.

Можно подготовить остальную геометрию, но не выдавать экран за visual-match.

---

## PHASE B — IMPLEMENT HOME ONLY

После read-only аудита:

1. Приведи только Главный экран к `14_UI_VISUAL_CONTRACT.md`.
2. Не меняй тексты.
3. Не меняй routing.
4. Не меняй business logic.
5. Не меняй соседние экраны.
6. Не создавай новую композицию.
7. Не добавляй новые UI-блоки.

---

## CONTROL WIDTH

Главная контрольная ширина:

`390 px`

Цель:
максимально приблизить живой экран к `JIMON_HOME_REFERENCE_390.png`.

---

## PHASE C — SCREENSHOT

Запусти приложение локально.

Сделай screenshot:

```text
viewport: 390 × 844
DPR: 1
zoom: 100%
scrollY: 0
```

Сохрани:

`artifacts/visual/home_390_actual.png`

---

## PHASE D — OVERLAY / DIFF

Reference:
`JIMON_HOME_REFERENCE_390.png`

Сделай:

`artifacts/visual/home_390_overlay_50.png`

и

`artifacts/visual/home_390_diff.png`

Сравнивай только app-content area; OS/device chrome из исходного mockup уже исключён из normalized reference.

---

## PHASE E — CALIBRATION

Исправляй в таком порядке:

1. background composition;
2. landscape crop;
3. logo;
4. title;
5. subtitle;
6. newcomer card position/size;
7. partner card position/size;
8. role icons;
9. arrows;
10. benefits;
11. shadows;
12. colors;
13. typography micro-adjustments.

После существенного изменения повтори screenshot + overlay.

Не делай хаотичные большие правки.

---

## PHASE F — RESPONSIVE CHECK

После хорошего совпадения 390 px проверь:

- 360 × 800
- 375 × 812
- 390 × 844
- 393 × 852
- 412 × 915
- 430 × 932

Условия:
- нет horizontal scroll;
- карточки не обрезаны;
- текст не налезает;
- заголовок на 390 остаётся в 2 строки;
- преимущества остаются 3 колонками;
- на коротком экране разрешён вертикальный scroll;
- композиция не перестраивается в новый дизайн.

Сделай screenshots этих ширин только после калибровки 390.

---

## DO NOT COMMIT YET

После выполнения:
- НЕ commit;
- НЕ push.

Сначала дай отчёт владельцу.

---

## FINAL REPORT

Покажи:

1. Изменённые файлы.
2. Что изменено.
3. Какие approved assets использованы.
4. Есть ли missing exact assets.
5. Screenshot path.
6. Overlay path.
7. Diff path.
8. Результаты responsive check.
9. `git diff --stat`.
10. `git status --short`.

В конце остановись и жди команды владельца.

Нельзя переходить к экрану Новичка или Партнёра.
