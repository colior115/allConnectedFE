# business-package

## Responsibility
Owns all business-domain logic: fetching business data from the backend, the business context (active business, role, type, token), role-based access control, and the screens for picking a business, the dashboard, and the no-permission state.

## Layers & entry points

| Entry point | Layer | Purpose |
|---|---|---|
| `BUSINESS_CONTEXT` | INFRA | Contributes `BusinessContextInfraAPI`; mounts `BusinessProvider` which registers the business-token getter in `apiClient` |
| `BUSINESS_DATA_SERVICE` | DATA_SERVICE | Contributes `BusinessDataServiceAPI` — CRUD + connect calls to `/business` |
| `BUSINESS_UI` | UI | Contributes `BusinessPicker`, `Dashboard`, and `NoPermission` screens |

## Public APIs

### `BusinessContextInfraAPI` (INFRA)
Stores the active business context (available to any component via `useBusinessContext()`).
- `setBusinessContext(context: BusinessContextValue): void`
- `clearBusinessContext(): void`
- `registerSetter(setter): void` — called by `BusinessProvider` on mount

`BusinessContextValue`:
```typescript
{ businessId: string; role: UserRole; type: UserBusinessRelationType; token: string; }
```

### `BusinessDataServiceAPI` (DATA_SERVICE)
- `getPublicDetails(id): Promise<BusinessPublic>`
- `getAll(): Promise<Business[]>`
- `getById(id): Promise<Business>`
- `getUserBusinesses(userEmail): Promise<UserBusinessRelation[]>`
- `connectToBusiness(id): Promise<string>` — returns the business-scoped JWT token
- `create(name): Promise<Business>`
- `update(id, name): Promise<Business>`
- `delete(id): Promise<Business>`

## Backend routes consumed
```
GET  /business/:id/public          → getPublicDetails
GET  /business/all                 → getAll
GET  /business/:id                 → getById
GET  /business/:email/all          → getUserBusinesses
GET  /business/:id/connect         → connectToBusiness (returns { token })
POST /business                     → create
PUT  /business/:id                 → update
DEL  /business/:id                 → delete
```
Business-scoped requests also attach `x-business-token` (set automatically by `apiClient` via the registered getter).

## DTOs
```typescript
// types/businessDTO.ts
interface BusinessDTO { id; name; businessId; }
type BusinessPublicDetailsDTO = Pick<BusinessDTO, 'id' | 'name'>;
interface UserBusinessRelationDTO { business: BusinessDTO; role: UserRole; type: UserType; }
```

## Domain models
```typescript
// types/business.ts
interface Business { id; name; businessId; }
interface BusinessPublic { id; name; }
type UserRole = 'admin' | 'user';
type UserBusinessRelationType = 'employee' | 'client';
interface UserBusinessRelation { business: Business; role: UserRole; type: UserBusinessRelationType; }
```

## Screens
| Screen | Protected | Description |
|---|---|---|
| `BusinessPicker` | true | Fetches user's businesses; auto-navigates to `Dashboard` if only one; shows picker otherwise |
| `Dashboard` | true | Home screen for an authenticated business user; shows logout. Wrapped with `RoleGuard role="admin"` |
| `NoPermission` | false | Shown when `RoleGuard` blocks access |

## Components
- `BusinessListItem` — card-style button used in `BusinessPickerScreen` for each business entry
- `RoleGuard` — wraps a screen and redirects to `NoPermission` if `ctx.role !== required role`

## Token flow
1. `BusinessPickerScreen` calls `connectToBusiness(id)` → receives token
2. `setBusinessContext({ …, token })` stores it via `BusinessContextInfraAPI`
3. `BusinessProvider` holds a `ref` to the token and registers a getter with `registerBusinessTokenGetter` in `apiClient`
4. Every subsequent `apiRequest` call reads the token via that getter and adds `x-business-token`

## Dependencies
- `AuthFlowsAPI` (auth-package) — for logout
- `MainViewInfraAPI` (main-view-package) — to mount `BusinessProvider`
- `ScreensInfraAPI` (screens-package) — to contribute screens

## Key files
```
apis/
  businessContextInfraAPI.ts
  createBusinessContextInfraAPI.ts
  businessDataServiceAPI.ts
  createBusinessDataServiceAPI.ts
types/
  business.ts
  businessDTO.ts
context/
  BusinessContext.tsx            BusinessProvider + useBusinessContext hook
components/
  BusinessListItem.tsx
  RoleGuard.tsx
screens/
  BusinessPickerScreen.tsx
  DashboardScreen.tsx
  NoPermissionScreen.tsx
entrypoints/
  businessPackage.tsx
index.ts
```
