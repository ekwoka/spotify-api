import { PersistentApiProperties, Query } from './utils/types';

export const setToken: Query =
  (newToken: string) => (props: PersistentApiProperties) => {
    props.token = newToken;
  };
