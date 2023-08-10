import { QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';

export const addToQueue =
  (uri: string): QueryFunction<Promise<void>> =>
  ({ token }) => {
    const endpoint = `me/player/queue?${toURLString({ uri })}`;
    return spotifyFetch<void>(
      endpoint,
      token,
      {
        method: 'POST',
      },
      false,
    );
  };
