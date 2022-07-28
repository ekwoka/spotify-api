export const isBrowser = (): boolean =>
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export const isNode = (): boolean =>
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;
