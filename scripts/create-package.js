#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const domain = process.argv[2];

if (!domain) {
  console.error('Usage: npm run create-package <domain>');
  console.error('Example: npm run create-package user');
  process.exit(1);
}

const pascal = domain.charAt(0).toUpperCase() + domain.slice(1);
const packageDir = join('src', 'packages', `${domain}-package`);

if (existsSync(packageDir)) {
  console.error(`Package "${domain}-package" already exists.`);
  process.exit(1);
}

const dirs = [
  packageDir,
  join(packageDir, 'apis'),
  join(packageDir, 'entrypoints'),
  join(packageDir, 'components'),
  join(packageDir, 'screens'),
  join(packageDir, 'context'),
];

dirs.forEach(dir => mkdirSync(dir, { recursive: true }));

// apis/{domain}InfraAPI.ts
writeFileSync(
  join(packageDir, 'apis', `${domain}InfraAPI.ts`),
  `import type { SlotKey } from 'repluggable';

export const ${pascal}InfraAPI: SlotKey<${pascal}InfraAPI> = {
  name: '${pascal} Infra API',
  public: true,
  layer: 'INFRA',
};

export interface ${pascal}InfraAPI {
  // TODO: define API methods
}
`,
);

// apis/create{Domain}InfraAPI.ts
writeFileSync(
  join(packageDir, 'apis', `create${pascal}InfraAPI.ts`),
  `import type { ${pascal}InfraAPI } from './${domain}InfraAPI';

export const create${pascal}InfraAPI = (): ${pascal}InfraAPI => ({
  // TODO: implement API methods
});
`,
);

// entrypoints/{domain}Package.tsx
writeFileSync(
  join(packageDir, 'entrypoints', `${domain}Package.tsx`),
  `import type { EntryPoint } from 'repluggable';
import { MainViewInfraAPI } from '../../main-view-package';
import { ${pascal}InfraAPI } from '../apis/${domain}InfraAPI';
import { create${pascal}InfraAPI } from '../apis/create${pascal}InfraAPI';

export const ${pascal}Package: EntryPoint[] = [
  {
    name: '${domain.toUpperCase()}_PACKAGE',
    layer: 'INFRA',

    declareAPIs() {
      return [${pascal}InfraAPI];
    },

    getDependencyAPIs() {
      return [MainViewInfraAPI];
    },

    attach(shell) {
      shell.contributeAPI(${pascal}InfraAPI, () => create${pascal}InfraAPI());
    },

    extend(_shell) {
      // TODO: contribute components, screens, providers
    },
  },
];
`,
);

// index.ts
writeFileSync(
  join(packageDir, 'index.ts'),
  `export { ${pascal}InfraAPI } from './apis/${domain}InfraAPI';
export { ${pascal}Package } from './entrypoints/${domain}Package';
`,
);

console.log(`Created ${domain}-package at ${packageDir}`);
console.log('');
console.log('Next steps:');
console.log(`  1. Define your API in apis/${domain}InfraAPI.ts`);
console.log(`  2. Implement it in apis/create${pascal}InfraAPI.ts`);
console.log(`  3. Wire the entry point in entrypoints/${domain}Package.tsx`);
console.log(`  4. Register ${pascal}Package in src/main.tsx`);
