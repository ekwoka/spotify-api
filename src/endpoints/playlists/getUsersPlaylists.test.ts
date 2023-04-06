import { beforeAll, describe, expect, it } from 'vitest';

import { PlaylistStub, getUsersPlaylists } from '.';
import { hasToken, makeMock } from '../../../testingTools';
import { PaginatedList } from '../../core';
import { PlaylistSavedStatus } from '../../core/cacheKeys';

describe('getUsersPlaylists', () => {
  beforeAll(() => {
    makeMock('v1/me/playlists', {
      handler: (req) => {
        if (!hasToken(req.headers as any))
          return {
            statusCode: 401,
          };
        return {
          statusCode: 200,
          data: mockedPlaylists,
        };
      },
    }).times(2);
    makeMock('/v1/me/playlists?limit=10&offset=20', {
      handler: (req) => {
        if (!hasToken(req.headers as any))
          return {
            statusCode: 401,
          };
        const params = new URLSearchParams(req.path.split('?')[1]);
        const [limit, offset] = ['limit', 'offset'].map((param) =>
          Number(params.get(param))
        );
        return {
          statusCode: 200,
          data: { limit, offset, items: [] },
        };
      },
    });
  });

  it('should return a function', () => {
    expect(typeof getUsersPlaylists()).toBe('function');
  });
  it('should return a list of playlists', async () => {
    const playlists = await getUsersPlaylists()({
      token: 'token',
      cache: new Map(),
    } as any);
    expect(playlists).toEqual(mockedPlaylists);
  });
  it('should pass through params', async () => {
    const { limit, offset } = await getUsersPlaylists({
      limit: 10,
      offset: 20,
    })({
      token: 'token',
      cache: new Map(),
    } as any);
    expect({ limit, offset }).toEqual({ limit: 10, offset: 20 });
  });
  it('should cache results', async () => {
    const cache = new Map();
    const playlists = await getUsersPlaylists()({
      token: 'token',
      cache,
    } as any);
    expect(cache.get('me/playlists?')).toBe(playlists);
    expect(cache.get(PlaylistSavedStatus)['37i9dQZF1DX5g856aiKiDS']).toBe(true);
  });
});

const mockedPlaylists: PaginatedList<PlaylistStub> = {
  href: 'https://api.spotify.com/v1/users/31fjwcwic6uemkaemmawj44s5m2q/playlists?offset=0&limit=1',
  items: [
    {
      collaborative: false,
      description:
        "Chill Korean tunes that's perfect with your latte or americano. (카페와 어울리는 편안한 음악들을 감상하세요.)",
      external_urls: {
        spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX5g856aiKiDS',
      },
      href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX5g856aiKiDS',
      id: '37i9dQZF1DX5g856aiKiDS',
      images: [
        {
          height: null,
          url: 'https://i.scdn.co/image/ab67706f0000000362a9874085e91a05440a1cee',
          width: null,
        },
      ],
      name: 'Dalkom Cafe',
      owner: {
        display_name: 'Spotify',
        external_urls: {
          spotify: 'https://open.spotify.com/user/spotify',
        },
        href: 'https://api.spotify.com/v1/users/spotify',
        id: 'spotify',
        type: 'user',
        uri: 'spotify:user:spotify',
      },
      primary_color: null,
      public: false,
      snapshot_id:
        'MTY2MDg5NDc0MywwMDAwMDAwMGRmNmU4MjQ1NDgzNmQ5ZGY5OTk4MmQ2N2QzOGFlYmU0',
      tracks: {
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX5g856aiKiDS/tracks',
        total: 50,
      },
      type: 'playlist',
      uri: 'spotify:playlist:37i9dQZF1DX5g856aiKiDS',
    },
  ],
  limit: 1,
  next: 'https://api.spotify.com/v1/users/31fjwcwic6uemkaemmawj44s5m2q/playlists?offset=1&limit=1',
  offset: 0,
  previous: null,
  total: 6,
};
