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

### Repluggable plugin system
The app is built on [Repluggable](https://github.com/wix/repluggable), a plugin architecture for React. Every feature lives in an `EntryPoint[]` (called a "package") that declares, contributes, and consumes typed APIs through the host's slot system. Packages are registered in `src/main.tsx` via `createAppHost`.

**API naming convention:** `{Domain}{Layer}API` — e.g. `AuthDataServiceAPI`, `ScreensInfraAPI`.

**Layers** (lower number = earlier initialization; a package may only depend on APIs from equal or lower layers):

| Level | Name | Purpose | Example |
|---|---|---|---|
| 0 | `INFRA` | Infrastructure that the rest of the system builds on. Routing, main view composition, screen management. | `MainViewInfraAPI`, `ScreensInfraAPI` |
| 60 | `DATA_SERVICE` | Calls to the backend REST API or Supabase auth. Raw data in, domain objects out. | `AuthDataServiceAPI`, `UserDataServiceAPI` |
| 70 | `DERIVATIVE_STATE` | Derives computed/boolean state from DATA_SERVICE APIs. No side effects. | `isAdminConnected` — reads `UserDataServiceAPI` and returns whether the current user has role `admin` |
| 80 | `FLOWS` | Orchestrates multi-step business logic using DERIVATIVE_STATE and DATA_SERVICE. | "Create user" flow — checks `isAdminConnected`, then calls `UserDataServiceAPI.createUser` |
| 90 | `UI` | React components and screens contributed to the app. Consumes APIs from all lower layers. | Contribute a screen via `ScreensInfraAPI.contributeScreen` from a UI-layer entry point |
| 100 | `APP` | Top-level app configuration and wiring that ties everything together. | |

**Package structure** — every package follows this layout:

```
{domain}-package/
  apis/               # All API definitions and factories for every layer
    {domain}{Layer}API.ts          # SlotKey + TypeScript interface
    create{Domain}{Layer}API.ts    # Factory that implements the API
  entrypoints/        # Repluggable EntryPoint[] declarations
    {domain}Package.tsx            # All entry points for the domain
  components/         # Domain-specific React components (if any)
  context/            # Domain-specific React context/providers (if any)
  screens/            # Domain screens and their style files (if any)
  index.ts            # Public barrel — only export what other packages need
  {domain}Package.ts  # (optional root re-export if needed)
```

Rules:
- All API files (`SlotKey` + interface + factory) live in `apis/`
- All `EntryPoint[]` definitions live in `entrypoints/`
- `index.ts` is the only public surface — imports from other packages must go through `index.ts`

**Providers:** packages that need to wrap the React tree (e.g. `AuthProvider`) call `MainViewInfraAPI.contributeProvider`. Providers are nested outermost-first around all contributed components.

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
