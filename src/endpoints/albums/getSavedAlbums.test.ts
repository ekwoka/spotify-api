import { beforeAll, describe, expect, it } from 'vitest';
import { getSavedAlbums, SavedAlbum } from '.';
import { hasToken, makeMock } from '../../../testingTools';
import { PaginatedList, PersistentApiProperties } from '../../core';

describe('getAlbumTracks', () => {
  beforeAll(() => {
    makeMock('v1/me/albums?', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedAlbums,
        };
      },
    }).persist();
    makeMock('v1/me/albums?limit=1&market=EN&offset=5', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        const params = new URLSearchParams(req.path.split('?')[1]);
        return {
          statusCode: 200,
          data: {
            ...mockedAlbums,
            market: params.get('market'),
            limit: params.get('limit'),
            offset: params.get('offset'),
          },
        };
      },
    });
  });
  it('should return a function', () => {
    const fn = getSavedAlbums();
    expect(typeof fn).toBe('function');
  });
  it('should return an Album List', async () => {
    const savedAlbumsPage = await getSavedAlbums()({
      token: 'token',
      cache: {},
    });
    expect(savedAlbumsPage).toEqual(mockedAlbums);
  });
  it('should pass options as query params', async () => {
    const { limit, offset, market } = (await getSavedAlbums({
      limit: 1,
      market: 'EN',
      offset: 5,
    })({
      token: 'token',
      cache: {},
    })) as unknown as PaginatedList<SavedAlbum> & { market: string };
    expect(limit).toBe('1');
    expect(offset).toBe('5');
    expect(market).toBe('EN');
  });
  it('should cache the albums returned', async () => {
    const Client = { token: 'token', cache: {} } as PersistentApiProperties;
    const savedAlbumsPage = await getSavedAlbums()(Client);
    expect(
      Client.cache.albums[savedAlbumsPage.items[0].album.id]
    ).toBeDefined();
  });
});

const mockedAlbums: PaginatedList<SavedAlbum> = {
  href: 'https://api.spotify.com/v1/me/albums?offset=0&limit=1&locale=en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
  items: [
    {
      added_at: '2022-04-24T08:55:15Z',
      album: {
        album_type: 'single',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/4k5fFEYgkWYrYvtOK3zVBl',
            },
            href: 'https://api.spotify.com/v1/artists/4k5fFEYgkWYrYvtOK3zVBl',
            id: '4k5fFEYgkWYrYvtOK3zVBl',
            name: 'BOL4',
            type: 'artist',
            uri: 'spotify:artist:4k5fFEYgkWYrYvtOK3zVBl',
          },
        ],
        available_markets: ['AD'],
        copyrights: [
          {
            text: '2022 쇼파르엔터테인먼트, under license to NHN Bugs Corp',
            type: 'C',
          },
          {
            text: '2022 쇼파르엔터테인먼트, under license to NHN Bugs Corp',
            type: 'P',
          },
        ],
        external_ids: {
          upc: '191953169354',
        },
        external_urls: {
          spotify: 'https://open.spotify.com/album/6tLZvqqoWszgPagzzNNQQF',
        },
        genres: [],
        href: 'https://api.spotify.com/v1/albums/6tLZvqqoWszgPagzzNNQQF',
        id: '6tLZvqqoWszgPagzzNNQQF',
        images: [
          {
            height: 640,
            url: 'https://i.scdn.co/image/ab67616d0000b27378b1c1b27cdfcd891f3a9047',
            width: 640,
          },
          {
            height: 300,
            url: 'https://i.scdn.co/image/ab67616d00001e0278b1c1b27cdfcd891f3a9047',
            width: 300,
          },
          {
            height: 64,
            url: 'https://i.scdn.co/image/ab67616d0000485178b1c1b27cdfcd891f3a9047',
            width: 64,
          },
        ],
        label: '쇼파르엔터테인먼트',
        name: 'Seoul',
        popularity: 47,
        release_date: '2022-04-20',
        release_date_precision: 'day',
        total_tracks: 5,
        tracks: {
          href: 'https://api.spotify.com/v1/albums/6tLZvqqoWszgPagzzNNQQF/tracks?offset=0&limit=50&locale=en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
          items: [
            {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4k5fFEYgkWYrYvtOK3zVBl',
                  },
                  href: 'https://api.spotify.com/v1/artists/4k5fFEYgkWYrYvtOK3zVBl',
                  id: '4k5fFEYgkWYrYvtOK3zVBl',
                  name: 'BOL4',
                  type: 'artist',
                  uri: 'spotify:artist:4k5fFEYgkWYrYvtOK3zVBl',
                },
              ],
              available_markets: ['AD'],
              disc_number: 1,
              duration_ms: 197333,
              explicit: false,
              external_urls: {
                spotify:
                  'https://open.spotify.com/track/6uEWYpv8HNAdbwHlqemG1F',
              },
              href: 'https://api.spotify.com/v1/tracks/6uEWYpv8HNAdbwHlqemG1F',
              id: '6uEWYpv8HNAdbwHlqemG1F',
              is_local: false,
              name: 'Love story',
              preview_url:
                'https://p.scdn.co/mp3-preview/eeea43c89b3ab7ed3eb60eecfb6a49844003c3e6?cid=774b29d4f13844c495f206cafdad9c86',
              track_number: 1,
              type: 'track',
              uri: 'spotify:track:6uEWYpv8HNAdbwHlqemG1F',
            },
            {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4k5fFEYgkWYrYvtOK3zVBl',
                  },
                  href: 'https://api.spotify.com/v1/artists/4k5fFEYgkWYrYvtOK3zVBl',
                  id: '4k5fFEYgkWYrYvtOK3zVBl',
                  name: 'BOL4',
                  type: 'artist',
                  uri: 'spotify:artist:4k5fFEYgkWYrYvtOK3zVBl',
                },
              ],
              available_markets: ['AD'],
              disc_number: 1,
              duration_ms: 204760,
              explicit: false,
              external_urls: {
                spotify:
                  'https://open.spotify.com/track/4b9LMCUaw55QajVRfrfPyS',
              },
              href: 'https://api.spotify.com/v1/tracks/4b9LMCUaw55QajVRfrfPyS',
              id: '4b9LMCUaw55QajVRfrfPyS',
              is_local: false,
              name: 'Seoul',
              preview_url:
                'https://p.scdn.co/mp3-preview/2a59b2615f90941494d5dac5d553e681a4eb1a50?cid=774b29d4f13844c495f206cafdad9c86',
              track_number: 2,
              type: 'track',
              uri: 'spotify:track:4b9LMCUaw55QajVRfrfPyS',
            },
            {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4k5fFEYgkWYrYvtOK3zVBl',
                  },
                  href: 'https://api.spotify.com/v1/artists/4k5fFEYgkWYrYvtOK3zVBl',
                  id: '4k5fFEYgkWYrYvtOK3zVBl',
                  name: 'BOL4',
                  type: 'artist',
                  uri: 'spotify:artist:4k5fFEYgkWYrYvtOK3zVBl',
                },
              ],
              available_markets: ['AD'],
              disc_number: 1,
              duration_ms: 155200,
              explicit: false,
              external_urls: {
                spotify:
                  'https://open.spotify.com/track/0FuDAmNLFEEO3eev0SBFTV',
              },
              href: 'https://api.spotify.com/v1/tracks/0FuDAmNLFEEO3eev0SBFTV',
              id: '0FuDAmNLFEEO3eev0SBFTV',
              is_local: false,
              name: 'What make us beautiful',
              preview_url:
                'https://p.scdn.co/mp3-preview/4f6822500f1c518ba5c696495c970b1faed4a2a0?cid=774b29d4f13844c495f206cafdad9c86',
              track_number: 3,
              type: 'track',
              uri: 'spotify:track:0FuDAmNLFEEO3eev0SBFTV',
            },
            {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4k5fFEYgkWYrYvtOK3zVBl',
                  },
                  href: 'https://api.spotify.com/v1/artists/4k5fFEYgkWYrYvtOK3zVBl',
                  id: '4k5fFEYgkWYrYvtOK3zVBl',
                  name: 'BOL4',
                  type: 'artist',
                  uri: 'spotify:artist:4k5fFEYgkWYrYvtOK3zVBl',
                },
              ],
              available_markets: ['AD'],
              disc_number: 1,
              duration_ms: 183720,
              explicit: false,
              external_urls: {
                spotify:
                  'https://open.spotify.com/track/7n5jmLC8G2Lt2wOb0PST8x',
              },
              href: 'https://api.spotify.com/v1/tracks/7n5jmLC8G2Lt2wOb0PST8x',
              id: '7n5jmLC8G2Lt2wOb0PST8x',
              is_local: false,
              name: 'In the mirror',
              preview_url:
                'https://p.scdn.co/mp3-preview/59a9468550c32a579ee6cc67b3b3e8ae3085aeae?cid=774b29d4f13844c495f206cafdad9c86',
              track_number: 4,
              type: 'track',
              uri: 'spotify:track:7n5jmLC8G2Lt2wOb0PST8x',
            },
            {
              artists: [
                {
                  external_urls: {
                    spotify:
                      'https://open.spotify.com/artist/4k5fFEYgkWYrYvtOK3zVBl',
                  },
                  href: 'https://api.spotify.com/v1/artists/4k5fFEYgkWYrYvtOK3zVBl',
                  id: '4k5fFEYgkWYrYvtOK3zVBl',
                  name: 'BOL4',
                  type: 'artist',
                  uri: 'spotify:artist:4k5fFEYgkWYrYvtOK3zVBl',
                },
              ],
              available_markets: ['AD'],
              disc_number: 1,
              duration_ms: 207986,
              explicit: false,
              external_urls: {
                spotify:
                  'https://open.spotify.com/track/5apKI7Cwh4wJhefjCnf7rt',
              },
              href: 'https://api.spotify.com/v1/tracks/5apKI7Cwh4wJhefjCnf7rt',
              id: '5apKI7Cwh4wJhefjCnf7rt',
              is_local: false,
              name: 'Star',
              preview_url:
                'https://p.scdn.co/mp3-preview/738df04d6c0706cab173eb235e8dca03e26922b2?cid=774b29d4f13844c495f206cafdad9c86',
              track_number: 5,
              type: 'track',
              uri: 'spotify:track:5apKI7Cwh4wJhefjCnf7rt',
            },
          ],
          limit: 50,
          next: null,
          offset: 0,
          previous: null,
          total: 5,
        },
        type: 'album',
        uri: 'spotify:album:6tLZvqqoWszgPagzzNNQQF',
      },
    },
  ],
  limit: 1,
  next: 'https://api.spotify.com/v1/me/albums?offset=1&limit=1&locale=en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
  offset: 0,
  previous: null,
  total: 5,
};
