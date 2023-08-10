import { beforeAll } from 'vitest';
import { describe, expect, it } from 'vitest';

import { hasToken } from '../../../testingTools/hasToken';
import { makeMock } from '../../../testingTools/makeMock';
import { getAlbums } from './';

describe('getAlbums', () => {
  beforeAll(() => {
    makeMock('v1/albums?ids=drip%2Cseoul', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedAlbums,
        };
      },
    });
    makeMock('v1/albums?ids=testid&market=EN', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: {
            albums: [
              {
                market: new URLSearchParams(req.path.split('?')[1]).get(
                  'market',
                ),
              },
            ],
          },
        };
      },
    });
  });

  it('should return an album list', async () => {
    const albums = await getAlbums(['drip', 'seoul'])({
      token: 'token',
      cache: new Map(),
    });
    expect(albums).toEqual(mockedAlbums);
  });

  it('should pass market as query param', async () => {
    const {
      albums: [{ market }],
    } = await getAlbums(
      ['testid'],
      'EN',
    )({
      token: 'token',
      cache: new Map(),
    });
    expect(market).toEqual('EN');
  });
});

const mockedAlbums = {
  albums: [
    {
      album_type: 'compilation',
      total_tracks: 9,
      available_markets: ['CA', 'BR', 'IT'],
      external_urls: {
        spotify: 'string',
      },
      href: 'string',
      id: '2up3OPMp9Tb4dAKM2erWXQ',
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
          height: 300,
          width: 300,
        },
      ],
      name: 'string',
      release_date: '1981-12',
      release_date_precision: 'year',
      restrictions: {
        reason: 'market',
      },
      type: 'album',
      uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
      artists: [
        {
          external_urls: {
            spotify: 'string',
          },
          followers: {
            href: 'string',
            total: 0,
          },
          genres: ['Prog rock', 'Grunge'],
          href: 'string',
          id: 'string',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
              height: 300,
              width: 300,
            },
          ],
          name: 'string',
          popularity: 0,
          type: 'artist',
          uri: 'string',
        },
      ],
      tracks: {
        href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20\n',
        items: [{}],
        limit: 20,
        next: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
        offset: 0,
        previous: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
        total: 4,
      },
    },
    {
      album_type: 'compilation',
      total_tracks: 9,
      available_markets: ['CA', 'BR', 'IT'],
      external_urls: {
        spotify: 'string',
      },
      href: 'string',
      id: '2up3OPMp9Tb4dAKM2erWXQ',
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
          height: 300,
          width: 300,
        },
      ],
      name: 'string',
      release_date: '1981-12',
      release_date_precision: 'year',
      restrictions: {
        reason: 'market',
      },
      type: 'album',
      uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
      artists: [
        {
          external_urls: {
            spotify: 'string',
          },
          followers: {
            href: 'string',
            total: 0,
          },
          genres: ['Prog rock', 'Grunge'],
          href: 'string',
          id: 'string',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
              height: 300,
              width: 300,
            },
          ],
          name: 'string',
          popularity: 0,
          type: 'artist',
          uri: 'string',
        },
      ],
      tracks: {
        href: 'https://api.spotify.com/v1/me/shows?offset=0&limit=20\n',
        items: [{}],
        limit: 20,
        next: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
        offset: 0,
        previous: 'https://api.spotify.com/v1/me/shows?offset=1&limit=1',
        total: 4,
      },
    },
  ],
};
