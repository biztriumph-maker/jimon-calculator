# Размещение JIMON CALCULATOR

Дата проверки: 20 октября 2026 года.

## Проект и сборка

- Локальный путь: `G:\Desktop\JIMON-calculator`
- Репозиторий: `https://github.com/biztriumph-maker/jimon-calculator.git`
- Рабочая ветка: `main`
- Утверждённый локальный commit: `3ae94988f7c78fbd72f77937924a11a5a3179727`
- Команда production-сборки: `npm run build`
- Папка результата сборки: `dist`
- Локальный просмотр production-сборки: `npm run preview`

Команда `npm run build` определена в `package.json` как `tsc -b && vite build`. Папка `dist` исключена из Git и должна формироваться заново из выбранного commit.

## GitHub и состояние ветки

На дату проверки `origin` указывает на:

`https://github.com/biztriumph-maker/jimon-calculator.git`

Удалённая ветка `origin/main` фактически указывает на commit:

`b3f486fa9c054a4c5f8da90269395f0c301df63a`

Локальная ветка `main` находится на commit `3ae9498` и опережает удалённую `main` на четыре commit, отставание отсутствует. Следовательно, утверждённый информационный каталог и карточка Бирункана пока не отправлены в GitHub.

## Публичный адрес и платформа

- Публичный адрес: `https://jimon-calculator.pages.dev/`
- Доступность: подтверждена, HTTP `200`
- Платформа: Cloudflare Pages — подтверждено

Подтверждающие признаки:

- адрес находится в домене `pages.dev`;
- HTTP-ответ содержит заголовок `Server: cloudflare` и `CF-RAY`;
- для последнего commit удалённой ветки `main` GitHub показывает успешный check-run `Cloudflare Pages`;
- URL check-run указывает на Pages-проект `jimon-calculator` в панели Cloudflare.

Публичная версия на дату проверки загружает файлы:

- `/assets/index-BPyjPuKW.js`
- `/assets/index-TwsrrIMN.css`

Локальная сборка commit `3ae9498` создаёт другие файлы:

- `/assets/index-CAEzuW5i.js`
- `/assets/index-B39kSbf_.css`

Запрос `/images/birunkan-detail.png` на публичном адресе возвращает HTML главной страницы, а не PNG. Это подтверждает, что публичный сайт ещё не содержит утверждённый локальный этап с новой фотографией Бирункана.

## Известная схема публикации

Привязка репозитория GitHub к Cloudflare Pages подтверждена успешным check-run `Cloudflare Pages` на удалённом commit `main`.

Следующие параметры соответствуют локальному проекту и ранее известной схеме, но требуют контрольной проверки в авторизованной панели Cloudflare перед любым push:

- production branch: предположительно `main`;
- build command: предположительно `npm run build`;
- build output directory: предположительно `dist`;
- automatic production deployments: текущий переключатель публично не доступен.

Cloudflare Pages по умолчанию автоматически собирает Git-интегрированный проект после push в разрешённую ветку, однако автодеплой production-ветки может быть отключён настройками Branch deployment controls. Наличие успешного check-run подтверждает, что интеграция работала для commit `b3f486f`, но без доступа к настройкам проекта нельзя гарантировать, что следующий push в `main` автоматически обновит production.

Перед push необходимо открыть Cloudflare Dashboard → Workers & Pages → `jimon-calculator` → Settings/Builds и проверить:

1. подключённый GitHub-репозиторий;
2. production branch;
3. состояние automatic production branch deployments;
4. build command;
5. build output directory;
6. переменные окружения, если они настроены.

Официальные справочные материалы:

- [Cloudflare Pages: Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Cloudflare Pages: Branch deployment controls](https://developers.cloudflare.com/pages/configuration/branch-build-controls/)
- [Cloudflare Pages: Serving Pages and SPA behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)

## SPA-маршрутизация

В `public` и текущей сборке `dist` отсутствуют верхнеуровневые `404.html`, `_redirects`, `_routes.json` и Pages Functions.

Фактический запрос к несуществующему пути `/__deployment_verify_spa_route__` вернул HTTP `200` и тот же HTML, что корневой адрес. Это подтверждает работу стандартного SPA fallback Cloudflare Pages.

Cloudflare Pages рассматривает проект без верхнеуровневого `404.html` как SPA и направляет неизвестные пути на `/`. Для текущего приложения отдельный `_redirects` не требуется. Навигация JIMON сейчас хранит экран в клиентском состоянии, а не использует самостоятельные URL-маршруты. При появлении URL-router, `404.html`, Pages Functions или нестандартных rewrite-правил это решение необходимо проверить повторно.

## Правила безопасности

1. Не выполнять `git push`, deploy или публикацию без отдельного явного разрешения пользователя.
2. Не изменять настройки Cloudflare, GitHub Apps, домены, Branch controls и переменные окружения без отдельного согласования.
3. Не записывать в репозиторий API-токены, пароли, deploy hooks, cookies и другие секреты.
4. Перед публикацией фиксировать точный commit и убеждаться, что рабочее дерево чистое.
5. Перед push выполнять `npm test`, `npm run build` и `git diff --check`.
6. Учитывать, что production-сайт содержит коммерческий калькулятор: обновление production заменяет весь опубликованный SPA-артефакт.
7. Для партнёрской проверки предпочтительно использовать отдельную preview-ветку или закрытое staging-окружение, не затрагивающее production.

## Проверка после разрешённой публикации

1. Записать SHA отправляемого commit и текущее состояние публичного сайта.
2. Выполнить только согласованный push/deploy.
3. Проверить GitHub check-run Cloudflare Pages для конкретного SHA.
4. Убедиться в успешном завершении сборки в Cloudflare Dashboard.
5. Открыть `https://jimon-calculator.pages.dev/` с очисткой кэша или в приватном окне.
6. Проверить HTTP `200`, загрузку актуальных JS/CSS и наличие ожидаемых статических файлов.
7. Выполнить smoke-проверку: главная → О продукции JIMON → Здоровье → Пищеварение → Бирункан.
8. Проверить три модальных окна и возврат назад.
9. Проверить мобильные размеры 360×800 и 390×844 и отсутствие горизонтальной прокрутки.
10. При ошибке не повторять деплой вслепую: сохранить логи, определить затронутый commit и согласовать откат или исправление.

## Ограничение проверки

Публичные HTTP-ответы и GitHub check-run подтверждают Cloudflare Pages и связь с репозиторием. Точные текущие значения production branch, build command, output directory и переключателя автодеплоя доступны только в авторизованной панели Cloudflare и в рамках этой проверки не изменялись.
