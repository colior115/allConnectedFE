# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Type-check with tsc, then Vite build
npm run lint      # ESLint across the entire project
npm run preview   # Preview the production build locally
```

There is no test runner configured.

## Architecture

### Multi-tenant routing
All routes are scoped under a `/:businessId` prefix. `BusinessLayout` (in `src/app/router/`) validates that the business exists before rendering children. `ProtectedRoute` enforces both authentication and business membership. Public routes are `/:businessId/login` and `/:businessId/register`; the root `/:businessId` is the authenticated home.

### Auth via Supabase
`AuthContext` (`src/app/providers/AuthContext.tsx`) is the single source of truth for `user`, `session`, and `appUser` (the business-specific user record). It wraps the entire app. The Supabase client is initialized in `src/utils/supabase.ts` using `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Sessions persist via cookie storage with a 1-year max age.

### API layer
`src/services/apiClient.ts` is the central HTTP client — it reads the current Supabase session and automatically attaches the JWT as a Bearer token on every request. The backend base URL comes from `VITE_BACKEND_URL` (defaults to `http://localhost:3000`). All API responses come in as DTOs (`src/types/dto/`) and are converted to domain models (`src/types/models/`) through mappers in `src/mappers/`.

### State management
No external state library. Global auth state lives in `AuthContext`; everything else uses local component state or custom hooks (e.g., `useBusinessDetails` in `src/hooks/`).

### Styling
Components use inline styles with design tokens from `src/styles/theme/` (`colors.ts`, `typography.ts`). Global/reset styles are in `src/styles/global.css`. SASS is available but the primary pattern is CSS-in-JS via theme constants.

### Internationalization
i18next is configured for `en` and `he` (Hebrew). Translation files live in `src/i18n/locales/{lang}/translation.json`. Use `useTranslation()` from `react-i18next` inside components.

## Environment variables

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_BACKEND_URL
```

Copy `.env` (already present) and adjust `VITE_BACKEND_URL` to point at your local backend instance.
