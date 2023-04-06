import { beforeAll, describe, expect, it } from 'vitest';

import { hasToken, makeMock } from '../../../testingTools';
import { PaginatedList, PersistentApiProperties } from '../../core';
import { Album, newReleases } from './';

describe('newReleases', () => {
  beforeAll(() => {
    makeMock('v1/browse/new-releases', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedReleases,
        };
      },
    }).persist();
    makeMock('v1/browse/new-releases?country=KR&limit=5&offset=5', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        const params = new URLSearchParams(req.path.split('?')[1]);
        const data = {
          albums: {
            ...mockedReleases.albums,
            limit: params.get('limit'),
            offset: params.get('offset'),
            country: params.get('country'),
          },
        };
        return {
          statusCode: 200,
          data: data,
        };
      },
    }).persist();
  });
  it('returns a function', () => {
    expect(typeof newReleases()).toBe('function');
  });
  it('returns a list of albums', async () => {
    const releases = await newReleases()({
      token: 'token',
    } as PersistentApiProperties);
    expect(releases).toEqual(mockedReleases);
  });
  it('passes query parameters', async () => {
    const testQuery = {
      country: 'KR',
      limit: 5,
      offset: 5,
    };
    const {
      albums: { limit, offset, country },
    } = (await newReleases(testQuery)({
      token: 'token',
    } as PersistentApiProperties)) as unknown as { albums: typeof testQuery };
    expect({ country, limit: Number(limit), offset: Number(offset) }).toEqual(
      testQuery
    );
  });
});

const mockedReleases: { albums: PaginatedList<Album> } = {
  albums: {
    href: 'https://api.spotify.com/v1/me/albums?offset=0&limit=1&locale=en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
    items: [
      {
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
    ],
    limit: 1,
    next: 'https://api.spotify.com/v1/me/albums?offset=1&limit=1&locale=en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
    offset: 0,
    previous: null,
    total: 5,
  },
};
