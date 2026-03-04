# Project Guide (AGENT)

## Архитектура
- **Монорепо**: `backend/` (Strapi v5), `frontend/` (Astro SSR), `backend/src/contracts/` (контракты/валидаторы).
- **Backend**: Strapi v5 (CJS runtime). Контракты и валидаторы лежат в `backend/src/contracts/`.
- **Frontend**: Astro SSR с адаптером Node (запуск через Node.js). Tailwind + SCSS.
- **Plugins**: локальные плагины в `backend/src/plugins/*`.

## Команды
### Root
- `npm run install:all` — установка зависимостей root, `backend/` и `frontend/`
- `npm run dev` — параллельно `backend develop` и `frontend dev`
- `npm run lint` / `npm run lint:fix`
- `npm run typecheck`
- `npm run build`

### Backend
- `npm install --prefix backend`
- `npm run develop --prefix backend`
- `npm run build --prefix backend`

### Frontend
- `npm install --prefix frontend`
- `npm run dev --prefix frontend`
- `npm run build --prefix frontend`
- `npm run preview --prefix frontend`
- `npm run start --prefix frontend` — SSR (Node.js) после build

## ENV
- Root: `.env` (docker/compose, mysql)
- Backend: `backend/.env`
- Frontend: `frontend/.env`

## Dev-процессы
- **Код только на TypeScript**.
- **Никаких `any`**: все функции и структуры должны быть типизированы.
- **Все endpoint'ы валидируются** через схемы в `backend/src/contracts/`.
- **Astro**: в `.astro` файлах используем TypeScript.
- **Tailwind**: максимально переиспользуем классы/селекторы; избегаем дублей.
- **Tailwind JIT**: не включать/не использовать.
- **Дизайн**: ориентируемся на `frontend/design.config.ts`.
- **Кастомные размеры** (например `381px`) выносить в отдельные селекторы и соблюдать **БЭМ**.
- **Декомпозиция**: дробим компоненты на логические части.

## Стиль кода
- Строгая типизация, без `any`.
- Контракты/схемы — источник правды, использовать их для validation + типов.
- ASTRO/TSX: аккуратная структура и небольшие компоненты.
- БЭМ для кастомных CSS селекторов.
