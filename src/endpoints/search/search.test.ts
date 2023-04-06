import { beforeAll, describe, expect, it } from 'vitest';

import { hasToken, makeMock } from '../../../testingTools';
import { PersistentApiProperties } from '../../core';
import { search } from './';

describe('search', () => {
  beforeAll(() => {
    makeMock('v1/search?q=pink+venom&type=track', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedSearch,
        };
      },
    });
    makeMock('/v1/search?q=pink+venom&type=track%2Cartist', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: { ...mockedSearch, artists: mockedSearch.tracks },
        };
      },
    });
    makeMock(
      '/v1/search?q=pink+venom&type=track&limit=10&offset=5&market=KR&include_external=audio',
      {
        handler: (req) => {
          if (!hasToken(req.headers as unknown as string[]))
            return { statusCode: 401 };
          const params = new URLSearchParams(req.path.split('?')[1]);
          return {
            statusCode: 200,
            data: {
              tracks: {
                ...mockedSearch.tracks,
                limit: params.get('limit'),
                offset: params.get('offset'),
                market: params.get('market'),
                include_external: params.get('include_external'),
              },
            },
          };
        },
      }
    );
  });
  it('should return a function', () => {
    expect(typeof search('pink venom', 'track')).toBe('function');
  });
  it('should handle searchQuery & type', async () => {
    const searchQuery = 'pink venom';
    const results = await search(
      searchQuery,
      'track'
    )({
      token: 'token',
    } as PersistentApiProperties);
    expect(results.tracks.items[0].name).toBe('Pink Venom');
  });
  it('should accept a type array', async () => {
    const results = await search('pink venom', ['track', 'artist'])({
      token: 'token',
    } as PersistentApiProperties);
    expect(results.tracks).toBeDefined();
    expect(results.artists).toBeDefined();
  });
  it('should pass options to query', async () => {
    const results = (await search('pink venom', 'track', {
      limit: 10,
      offset: 5,
      market: 'KR',
      include_external: 'audio',
    })({ token: 'token' } as PersistentApiProperties)) as any;
    expect(results.tracks.limit).toBe('10');
    expect(results.tracks.offset).toBe('5');
    expect(results.tracks.market).toBe('KR');
    expect(results.tracks.include_external).toBe('audio');
  });
});

const mockedSearch = {
  tracks: {
    href: 'https://api.spotify.com/v1/search?query=pink+venom&type=track&locale=en-US%2Cen%3Bq%3D0.9%2Cko-KR%3Bq%3D0.8%2Cko%3Bq%3D0.7&offset=0&limit=2',
    items: [
      {
        album: {
          album_type: 'single',
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/0wPNn7zWcrevzBUqDdlOtj',
              },
              href: 'https://api.spotify.com/v1/artists/0wPNn7zWcrevzBUqDdlOtj',
              id: '0wPNn7zWcrevzBUqDdlOtj',
              name: 'Zayd',
              type: 'artist',
              uri: 'spotify:artist:0wPNn7zWcrevzBUqDdlOtj',
            },
          ],
          available_markets: ['KR'],
          external_urls: {
            spotify: 'https://open.spotify.com/album/44z2nXEaBTMefF3CUBtIUj',
          },
          href: 'https://api.spotify.com/v1/albums/44z2nXEaBTMefF3CUBtIUj',
          id: '44z2nXEaBTMefF3CUBtIUj',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b273971a36afa51cc3d320226091',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e02971a36afa51cc3d320226091',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d00004851971a36afa51cc3d320226091',
              width: 64,
            },
          ],
          name: 'Pink Venom',
          release_date: '2022-08-16',
          release_date_precision: 'day',
          total_tracks: 1,
          type: 'album',
          uri: 'spotify:album:44z2nXEaBTMefF3CUBtIUj',
        },
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/0wPNn7zWcrevzBUqDdlOtj',
            },
            href: 'https://api.spotify.com/v1/artists/0wPNn7zWcrevzBUqDdlOtj',
            id: '0wPNn7zWcrevzBUqDdlOtj',
            name: 'Zayd',
            type: 'artist',
            uri: 'spotify:artist:0wPNn7zWcrevzBUqDdlOtj',
          },
        ],
        available_markets: ['KR'],
        disc_number: 1,
        duration_ms: 106351,
        explicit: false,
        external_ids: {
          isrc: 'BRTRB2200065',
        },
        external_urls: {
          spotify: 'https://open.spotify.com/track/3OvOusjCoHNzHo4KJ7NEj2',
        },
        href: 'https://api.spotify.com/v1/tracks/3OvOusjCoHNzHo4KJ7NEj2',
        id: '3OvOusjCoHNzHo4KJ7NEj2',
        is_local: false,
        name: 'Pink Venom',
        popularity: 0,
        preview_url:
          'https://p.scdn.co/mp3-preview/80ca9e635ccce24bc307e79e415e3baf2be41f81?cid=774b29d4f13844c495f206cafdad9c86',
        track_number: 1,
        type: 'track',
        uri: 'spotify:track:3OvOusjCoHNzHo4KJ7NEj2',
      },
      {
        album: {
          album_type: 'single',
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF',
              },
              href: 'https://api.spotify.com/v1/artists/41MozSoPIsD1dJM0CLPjZF',
              id: '41MozSoPIsD1dJM0CLPjZF',
              name: 'BLACKPINK',
              type: 'artist',
              uri: 'spotify:artist:41MozSoPIsD1dJM0CLPjZF',
            },
          ],
          available_markets: ['KR'],
          external_urls: {
            spotify: 'https://open.spotify.com/album/3dZBZnDa3z20uEVnxR38M1',
          },
          href: 'https://api.spotify.com/v1/albums/3dZBZnDa3z20uEVnxR38M1',
          id: '3dZBZnDa3z20uEVnxR38M1',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b273f6c23cb08ef7cec88a57e248',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e02f6c23cb08ef7cec88a57e248',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d00004851f6c23cb08ef7cec88a57e248',
              width: 64,
            },
          ],
          name: 'Pink Venom',
          release_date: '2022-08-19',
          release_date_precision: 'day',
          total_tracks: 1,
          type: 'album',
          uri: 'spotify:album:3dZBZnDa3z20uEVnxR38M1',
        },
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF',
            },
            href: 'https://api.spotify.com/v1/artists/41MozSoPIsD1dJM0CLPjZF',
            id: '41MozSoPIsD1dJM0CLPjZF',
            name: 'BLACKPINK',
            type: 'artist',
            uri: 'spotify:artist:41MozSoPIsD1dJM0CLPjZF',
          },
        ],
        available_markets: ['KR'],
        disc_number: 1,
        duration_ms: 186964,
        explicit: false,
        external_ids: {
          isrc: 'KRA402200017',
        },
        external_urls: {
          spotify: 'https://open.spotify.com/track/0skYUMpS0AcbpjcGsAbRGj',
        },
        href: 'https://api.spotify.com/v1/tracks/0skYUMpS0AcbpjcGsAbRGj',
        id: '0skYUMpS0AcbpjcGsAbRGj',
        is_local: false,
        name: 'Pink Venom',
        popularity: 0,
        preview_url: null,
        track_number: 1,
        type: 'track',
        uri: 'spotify:track:0skYUMpS0AcbpjcGsAbRGj',
      },
    ],
    limit: 2,
    next: 'https://api.spotify.com/v1/search?query=pink+venom&type=track&locale=en-US%2Cen%3Bq%3D0.9%2Cko-KR%3Bq%3D0.8%2Cko%3Bq%3D0.7&offset=2&limit=2',
    offset: 0,
    previous: null,
    total: 767,
  },
};
