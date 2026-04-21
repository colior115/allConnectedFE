# screens-package

Manages screens and navigation within the Repluggable plugin system. Other packages contribute screens via the `ScreensAPI`, and the package handles rendering and stack-based navigation between them.

## Architecture

```
screens-package/
├── screensAPI.ts                   # SlotKey + ScreensAPI interface
├── createScreensAPI.ts             # API factory (slot wiring)
├── screensPackage.tsx              # EntryPoint — declares API, registers root component
├── types.ts                        # Re-exports for consumers
├── index.ts                        # Public barrel export
├── navigation/
│   └── navigation.ts              # Navigation interface
└── components/
    ├── baseScreen/
    │   └── baseScreen.tsx         # Layout wrapper for individual screens
    └── mainScreenWithNavigation/
        └── mainScreenWithNavigation.tsx  # Root renderer + navigation state
```

## How it works

1. **`ScreensPackage`** is an `EntryPoint[]` registered in `createAppHost`.
2. On `attach`, it contributes `ScreensAPI` to the shell.
3. On `extend`, it contributes `MainScreenWithNavigation` to `MainViewAPI`, making it the app's visible content.
4. Other packages call `screensAPI.contributeScreen(shell, screen, isInitial?)` to register their screens.
5. `MainScreenWithNavigation` maintains a stack and passes a typed `Navigation` object to the active screen.

## Contributing a screen

```typescript
// In your package's extend(shell) hook:
const screensAPI = shell.getAPI(ScreensAPI);

screensAPI.contributeScreen(
  shell,
  {
    name: 'MyScreen',
    screen: ({ navigation }) => (
      <BaseScreen title="My Screen">
        <button onClick={() => navigation.navigate('OtherScreen')}>Go</button>
        {navigation.canGoBack() && (
          <button onClick={navigation.goBack}>Back</button>
        )}
      </BaseScreen>
    ),
  },
  true, // pass true to make this the initial screen
);
```

Only **one** screen may be declared as initial. Declaring more than one throws at startup.
Screen names must be **unique** across all packages.

## Navigation API

| Method | Description |
|---|---|
| `navigate(screenName)` | Push a screen onto the stack |
| `goBack()` | Pop the current screen |
| `canGoBack()` | `true` when there is a previous screen to return to |
| `currentScreen` | Name of the currently visible screen |

## BaseScreen component

`BaseScreen` is a convenience layout wrapper exposed via `screensAPI.components.BaseScreen`:

```typescript
const { BaseScreen } = screensAPI.components;

<BaseScreen title="Optional heading">
  {/* your content */}
</BaseScreen>
```

It provides a flex column layout with an optional `<header>` and a scrollable `<main>`.

## Registering in the host

```typescript
import { mainViewPackage } from './packages/main-view-package/mainViewPackage';
import { ScreensPackage } from './packages/screens-package/screensPackage';

const host = createAppHost([
  ...mainViewPackage,
  ...ScreensPackage,
  // your feature packages that contribute screens
], { ... });
```
