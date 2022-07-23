import {
  PersistentApiProperties,
  QueryableApi,
  QueryFunction,
} from './utils/types';

export function spotifyApi(tkn: string): QueryableApi {
  const props: PersistentApiProperties = {
    token: tkn ?? '',
  };

  return <T>(fn: QueryFunction<T>): T => {
    if (!props.token) throw new Error('Current token is invalid');

    return fn(props);
  };
}
