# main-view-package

## Responsibility
The root composition layer. It owns the single DOM mount point, manages an ordered list of React providers, and renders the slot of contributed components (screens). Every other package plugs into the app through this package.

## Layers & entry points

| Entry point | Layer | Purpose |
|---|---|---|
| `Main-View` | INFRA | Contributes `MainViewInfraAPI`; mounts `MainViewComponent` as the repluggable main view |

## Public API

### `MainViewInfraAPI` (INFRA)
- `contributeComponent(shell, { component })` — adds a React component to the main component slot (rendered inside all providers)
- `contributeProvider(shell, { provider })` — adds a React context provider that wraps the entire app; providers are nested outermost-first in contribution order

## How providers work
Packages that need a React context available app-wide (e.g. `AuthProvider`, `BusinessProvider`) call:
```typescript
mainViewAPI.contributeProvider(shell, {
  provider: (children) => <MyProvider>{children}</MyProvider>,
});
```
The `MainViewComponent` nests all contributed providers around all contributed components.

## How to contribute a root component
`screens-package` contributes `MainScreenWithNavigation` here, which becomes the visible content of the app. Other packages that need a persistent root-level UI element (e.g. a toast system) can also contribute here.

## Key files
```
apis/
  mainViewInfraAPI.ts           SlotKey + interface
  createMainViewInfraAPI.ts     Factory — creates component + provider slots
components/
  mainViewComponent.tsx         Root React component (renders providers + components)
entrypoints/
  mainViewPackage.ts
index.ts
```
