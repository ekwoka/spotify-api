import { PersistentApiProperties } from '../core';

export const createMapper = <T, S>(
  cb: (val: T, client: PersistentApiProperties) => Promise<S>
): mappedCallback<T, S> =>
  ((vals: T | T[]) =>
    Array.isArray(vals)
      ? (client: PersistentApiProperties): Promise<S[]> =>
          Promise.all(vals.map((val) => cb(val, client)))
      : (client: PersistentApiProperties) =>
          cb(vals, client)) as mappedCallback<T, S>;

type mappedCallback<T, S> = {
  (vals: T[]): (client: PersistentApiProperties) => Promise<S[]>;
  (val: T): (client: PersistentApiProperties) => Promise<S>;
};

export type mappedArguments<T, S> = Parameters<mappedCallback<T, S>>;
