# auth-package

## Responsibility
Owns everything related to Supabase authentication and the global site context (logged-in user + session). It does NOT own login/register screens — those live in `user-package`.

## Layers & entry points

| Entry point | Layer | Purpose |
|---|---|---|
| `AUTH_SITE_CONTEXT` | INFRA | Contributes `SiteContextInfraAPI`; mounts `AuthProvider`; registers the screen guard that redirects unauthenticated users to `Login` |
| `AUTH_SUPABASE_DATA_SERVICE` | DATA_SERVICE | Contributes `AuthSupabaseDataServiceAPI` — thin wrapper around the Supabase JS client |
| `AUTH_DATA_SERVICE` | DATA_SERVICE | Contributes `AuthDataServiceAPI` — delegates to Supabase service |
| `AUTH_FLOWS` | FLOWS | Contributes `AuthFlowsAPI` — `login`, `register`, `logout` orchestration |

## Public APIs

### `SiteContextInfraAPI` (INFRA)
Bridges Supabase session state into the repluggable shell.
- `setUser(user)` / `setSession(session)` — push state updates
- `clearContext()` — wipe on logout
- `registerSetters(setUser, setSession)` — called by `AuthProvider` on mount

### `AuthDataServiceAPI` (DATA_SERVICE)
- `login(email, password): Promise<{ user, session }>`
- `register(email, password): Promise<void>`
- `logout(): Promise<void>`

### `AuthFlowsAPI` (FLOWS)
- `login(email, password): Promise<void>` — logs in + updates site context
- `register(email, password): Promise<void>`
- `logout(): Promise<void>` — logs out + clears site context

### `useAuth()` hook
React hook exported from `index.ts`. Returns `{ user, session, loading }`. Must be called inside a component rendered under `AuthProvider`.

## Screen guard
`AUTH_SITE_CONTEXT.extend` registers a screen guard via `ScreensInfraAPI.setScreenGuard`. Protected screens redirect to `Login` if `user` is null after loading.

## Dependencies
- `MainViewInfraAPI` (main-view-package) — to contribute `AuthProvider`
- `ScreensInfraAPI` (screens-package) — to register the screen guard

## Key files
```
apis/
  siteContextInfraAPI.ts         SlotKey + interface
  createSiteContextInfraAPI.ts   Factory
  authSupabaseDataServiceAPI.ts  SlotKey + interface (private)
  createAuthSupabaseDataServiceAPI.ts
  authDataServiceAPI.ts          SlotKey + interface (public)
  createAuthDataServiceAPI.ts
  authFlowsAPI.ts                SlotKey + interface
  createAuthFlowsAPI.ts
context/
  AuthContext.tsx                AuthProvider + useAuth hook
entrypoints/
  authPackage.tsx                All entry points
index.ts                         Public barrel
```

## i18n
Uses `auth.*` translation keys (defined in `src/i18n/locales/{lang}/translation.json`). Strings are rendered in `user-package` screens.
