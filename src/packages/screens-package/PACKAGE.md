# screens-package

## Responsibility
Stack-based screen navigation for the app. Packages contribute screens by name; this package tracks the stack, renders the active screen, runs the screen guard for protected screens, and exposes a `Navigation` object to each screen component.

## Layers & entry points

| Entry point | Layer | Purpose |
|---|---|---|
| `SCREENS` | INFRA | Contributes `ScreensInfraAPI`; contributes `MainScreenWithNavigation` to `MainViewInfraAPI` |

## Public API

### `ScreensInfraAPI` (INFRA)
- `contributeScreen(shell, screen, isInitial?)` — register a screen; pass `true` for `isInitial` on exactly one screen (the first rendered)
- `getScreens()` — returns all contributed screens
- `getInitialScreen()` — returns the name of the initial screen
- `setScreenGuard(guard)` — registers a `ScreenGuardComponent` that wraps every protected screen
- `getScreenGuard()` — returns the registered guard (if any)
- `components.BaseScreen` — layout wrapper component available to all packages

### Screen contribution shape
```typescript
interface ContributedScreen {
  name: string;                              // unique across all packages
  screen: (props: ScreenWithNavigationProps) => ReactNode;
  protected?: boolean;                       // default true — runs through the guard
}
```

### `ScreenWithNavigationProps`
```typescript
type ScreenWithNavigationProps = { navigation: Navigation };
```

### `Navigation`
```typescript
interface Navigation {
  navigate(screenName: string): void;
  goBack(): void;
  canGoBack(): boolean;
  currentScreen: string;
}
```

## Screen guard
`auth-package` registers the guard via `setScreenGuard`. The guard is a React component:
```typescript
type ScreenGuardComponent = (props: { navigate: (s: string) => void; children: ReactNode }) => ReactNode;
```
Screens with `protected: false` bypass the guard entirely. All others are wrapped by it.

## BaseScreen
A layout wrapper exposed through `screensAPI.components.BaseScreen`. Provides a flex-column layout with an optional header and a scrollable main area. Always wrap screen content in `BaseScreen` when contributing screens.

## How to contribute a screen (pattern)
```typescript
// In your package's UI layer extend(shell):
const screensAPI = shell.getAPI(ScreensInfraAPI);
const { BaseScreen } = screensAPI.components;

screensAPI.contributeScreen(shell, {
  name: 'MyScreen',
  protected: false,          // omit or set true for protected
  screen: ({ navigation }) => (
    <BaseScreen>
      <MyScreenComponent navigation={navigation} />
    </BaseScreen>
  ),
});
```

## Key files
```
apis/
  screensInfraAPI.ts                 SlotKey + all types
  createScreensInfraAPI.ts           Factory
types/
  navigation.ts                      Navigation interface
components/
  baseScreen/baseScreen.tsx          BaseScreen layout component
  mainScreenWithNavigation/
    mainScreenWithNavigation.tsx     Root navigator — stack state + guard execution
entrypoints/
  screensPackage.ts
index.ts
```
