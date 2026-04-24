# Component Rules

## 1. Screens must use building blocks
Every screen is composed of building blocks (`src/components/`) and, when domain-specific UI is needed, package-level components (`{domain}-package/components/`). Raw HTML content elements (`<h1>`, `<p>`, `<button>`, etc.) must not appear directly in screen files.

## 2. Building blocks own their styles
Building blocks in `src/components/` apply colors and typography exclusively from the theme tokens (`src/styles/theme/colors.ts`, `src/styles/theme/typography.ts`). They do not accept a `style` prop. If a use-case requires a visual variation that the block does not express, create a new building block or a package-level component — never override styles from the outside.

## 3. RTL/LTR support is mandatory
All components must use CSS logical properties (`paddingInline`, `paddingBlock`, `marginInlineStart`, `insetInlineEnd`, `textAlign: 'start'` / `'end'`, etc.) instead of physical properties (`padding-left`, `margin-right`, `left`, `right`). The document direction is set by the i18n layer and propagates automatically.

## 4. All content must be translated
Every user-facing string must come from the i18n translation system via `useTranslation()`. No hardcoded text in components or screens. Translation files live in `src/i18n/locales/{lang}/translation.json` and must be kept in sync for both `en` and `he`.
