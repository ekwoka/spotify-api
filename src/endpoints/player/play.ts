import { QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';

export const play =
  (
    context: string | string[],
    {
      device_id,
      ...options
    }: {
      offset?:
        | {
            position: number;
          }
        | {
            uri: string;
          };
      position_ms?: number;
      device_id?: string;
    } = {},
  ): QueryFunction<Promise<void>> =>
  ({ token }) => {
    const endpoint = `me/player/play?${
      device_id ? toURLString({ device_id }) : ''
    }`;
    return spotifyFetch<void>(
      endpoint,
      token,
      {
        method: 'PUT',
        body: JSON.stringify({
          [Array.isArray(context) ? 'uris' : 'context_uri']: context,
          ...options,
        }),
      },
      false,
    );
  };

export const resume = play;
