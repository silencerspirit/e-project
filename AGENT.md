# Project Guide (AGENT)

## Архитектура
- **Монорепо**: `backend/` (Strapi v5), `frontend/` (Astro SSR), `backend/src/contracts/` (контракты/валидаторы).
- **Backend**: Strapi v5 (CJS runtime). Контракты и валидаторы лежат в `backend/src/contracts/`.
- **Frontend**: Astro SSR с адаптером Node (запуск через Bun). Tailwind + SCSS.
- **Plugins**: локальные плагины в `backend/src/plugins/*`.

## Команды
### Root
- `bun run install:all` — установка зависимостей (root + backend + frontend)
- `bun run dev` — параллельно `backend develop` и `frontend dev`
- `bun run lint` / `bun run lint:fix`
- `bun run typecheck`
- `bun run build:ts` / `bun run build:ts:watch`

### Backend
- `bun develop`
- `bun build`

### Frontend
- `bun dev`
- `bun build`
- `bun preview`
- `bun start` — SSR (Bun) после build

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

## Эндпоинты (ожидаемо)
- Backend API:
  - `GET /api/menu`
  - `GET /api/news`
  - `GET /api/news/:slug`
- Локальные plugin endpoints могут иметь префикс `/api/<plugin>/...` (если не проксируются на core API).

## Стиль кода
- Строгая типизация, без `any`.
- Контракты/схемы — источник правды, использовать их для validation + типов.
- ASTRO/TSX: аккуратная структура и небольшие компоненты.
- БЭМ для кастомных CSS селекторов.
