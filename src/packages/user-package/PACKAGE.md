# user-package

## Responsibility
Owns user domain logic: CRUD operations against the backend `/users` REST API, and the Login/Register screens that are the entry point into the app.

## Layers & entry points

| Entry point | Layer | Purpose |
|---|---|---|
| `USER_DATA_SERVICE` | DATA_SERVICE | Contributes `UserDataServiceAPI` — CRUD calls to `/users` |
| `USER_UI` | UI | Contributes `Login` (initial screen) and `Register` screens |

## Public APIs

### `UserDataServiceAPI` (DATA_SERVICE)
- `getUserByEmail(email): Promise<User>`
- `getUserById(id): Promise<User>`
- `createUser(data: UpdateUserInputDTO): Promise<User>`
- `updateUser(id, data: UpdateUserInputDTO): Promise<User>`
- `deleteUser(id): Promise<User>`

## Backend routes consumed
```
GET    /users/email/:email   → getUserByEmail
GET    /users/:userId        → getUserById
POST   /users/               → createUser
PUT    /users/:userId        → updateUser
DELETE /users/:userId        → deleteUser
```
All routes are protected by `authMiddleware` on the backend; the `apiClient` automatically attaches the Supabase JWT.

## DTOs
```typescript
// types/userDTO.ts
interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: UserSystemRole;   // 'admin' | 'user'
}
type UpdateUserInputDTO = Partial<Omit<UserDTO, 'id'>>;
```

## Domain model
```typescript
// types/user.ts
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: UserSystemRole;
}
```

## Screens
| Screen | Protected | Description |
|---|---|---|
| `Login` | false | Email/password login form. Initial screen. Navigates to `BusinessPicker` on success. Uses `AuthFlowsAPI.login`. |
| `Register` | false | Registration form. Navigates to `Login` on success. Uses `AuthFlowsAPI.register`. |

Screens use `auth.*` i18n keys and building blocks from `src/components/`.

## Dependencies
- `AuthFlowsAPI` (auth-package) — for login/register/logout actions
- `ScreensInfraAPI` (screens-package) — to contribute screens

## Key files
```
apis/
  userDataServiceAPI.ts          SlotKey + interface
  createUserDataServiceAPI.ts    Factory (DTO → domain mappers inside)
types/
  user.ts                        Domain model + UserSystemRole
  userDTO.ts                     UserDTO + UpdateUserInputDTO
screens/
  LoginScreen.tsx
  RegisterScreen.tsx
entrypoints/
  userPackage.tsx                All entry points
index.ts                         Public barrel
```
