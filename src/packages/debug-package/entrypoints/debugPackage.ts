import type { EntryPoint } from 'repluggable';

interface RepluggableAPIEntry {
  impl: () => unknown;
  key: { name: string; public: boolean; layer: string };
}

interface RepluggableAppDebug {
  utils: {
    apis(): RepluggableAPIEntry[];
  };
}

const toKey = (name: string) =>
  name
    .replace(/\s+(\w)/g, (_, c: string) => c.toUpperCase())
    .replace(/^(.)/, (c) => c.toLowerCase());

export const DebugPackage: EntryPoint[] = [
  {
    name: 'DEBUG',
    layer: 'UI',

    extend() {
      if (new URLSearchParams(window.location.search).get('debug') !== 'true') return;

      const debug = (window as unknown as Record<string, unknown>).repluggableAppDebug as RepluggableAppDebug | undefined;
      if (!debug) return;

      const entries = debug.utils.apis();
      const apis: Record<string, unknown> = {};
      for (const { key, impl } of entries) {
        apis[toKey(key.name)] = impl();
      }

      (window as unknown as Record<string, unknown>).d = { apis };
    },
  },
];
