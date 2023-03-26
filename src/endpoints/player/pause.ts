import { QueryFunction } from '../../core';
import { spotifyFetch, toURLString } from '../../utils';

export const pause =
  (device_id?: string): QueryFunction<Promise<void>> =>
  ({ token }) => {
    const endpoint = `me/player/pause?${
      device_id ? toURLString({ device_id }) : ''
    }`;
    return spotifyFetch<void>(endpoint, token, { method: 'PUT' }, false);
  };
