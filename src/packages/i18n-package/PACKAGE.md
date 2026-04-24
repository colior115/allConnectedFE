# i18n-package

## Responsibility
Initialises `i18next` and exposes a shell API so any package can programmatically change the active language. Also sets `document.documentElement.dir` so RTL/LTR layout flips automatically.

## Layers & entry points

| Entry point | Layer | Purpose |
|---|---|---|
| `I18N` | INFRA | Initialises i18next; contributes `I18nInfraAPI` |

## Public API

### `I18nInfraAPI` (INFRA)
- `changeLanguage(lang: string): Promise<void>` — switches language and sets `document.dir` (`'rtl'` for `he`/`ar`, `'ltr'` for everything else)
- `getLanguage(): string` — returns the current i18next language code

## Translation files
```
src/i18n/locales/
  en/translation.json   English (default)
  he/translation.json   Hebrew (RTL)
```

Every user-facing string in the app must have a key in both files. Namespaces follow the domain they belong to:
- `auth.*` — login, register, logout strings (rendered in user-package screens)
- `dashboard.*` — dashboard screen
- `businessPicker.*` — business picker screen
- `noPermission.*` — no-permission screen

## RTL support
`createI18nInfraAPI` applies direction on init and on every `changeLanguage` call:
```typescript
const RTL_LANGS = new Set(['he', 'ar']);
document.documentElement.dir = RTL_LANGS.has(lang) ? 'rtl' : 'ltr';
```
Components must use CSS logical properties (`paddingInline`, `marginBlockStart`, `textAlign: 'start'`, etc.) — see `src/components/RULES.md`.

## Adding a new language
1. Create `src/i18n/locales/{lang}/translation.json` with all keys.
2. Add `{ code: '{lang}', … }` to the resources object in `createI18nInfraAPI.ts`.
3. If the language is RTL, add its code to `RTL_LANGS`.

## Key files
```
apis/
  i18nInfraAPI.ts           SlotKey + interface
  createI18nInfraAPI.ts     Factory — i18next init + direction management
entrypoints/
  i18nPackage.tsx
index.ts
```
