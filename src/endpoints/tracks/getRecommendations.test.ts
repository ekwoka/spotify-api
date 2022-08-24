import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { getRecommendations, Recommendations } from './';

describe('getRecommendations', () => {
  beforeAll(() => {
    makeMock('v1/recommendations', {
      handler: (req) => {
        if (!hasToken(req.headers as any)) return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedRecommendations,
        };
      },
    });
    makeMock('v1/recommendations?max_key=5&target_valence=0.6', {
      handler: (req) => {
        if (!hasToken(req.headers as any)) return { statusCode: 401 };
        const params = new URLSearchParams(req.path.split('?')[1]);
        const [max_key, target_valence] = ['max_key', 'target_valence'].map(
          (key) => Number(params.get(key))
        );
        return {
          statusCode: 200,
          data: {
            max_key,
            target_valence,
          },
        };
      },
    });
    makeMock(
      '/v1/recommendations?seed_artists=1VwDG9aBflQupaFNjUru9A%2C4k5fFEYgkWYrYvtOK3zVBl&seed_genres=rock%2Cpop&seed_tracks=3T4s8KFP2SGW7hfmbcICsv%2C2occELokWRfqLIlQJhJLZ6',
      {
        handler: (req) => {
          if (!hasToken(req.headers as any)) return { statusCode: 401 };
          const params = new URLSearchParams(req.path.split('?')[1]);
          const [seed_artists, seed_genres, seed_tracks] = [
            'seed_artists',
            'seed_genres',
            'seed_tracks',
          ].map((key) => params.get(key));
          return {
            statusCode: 200,
            data: {
              seed_artists,
              seed_genres,
              seed_tracks,
            },
          };
        },
      }
    );
  });
  it('should return a function', () => {
    expect(typeof getRecommendations()).toBe('function');
  });
  it('should return a recommendations object', async () => {
    const results = await getRecommendations()({
      token: 'token',
    } as any);
    expect(results).toEqual(mockedRecommendations);
  });
  it('should accept options', async () => {
    const results = await getRecommendations({
      max_key: 5,
      target_valence: 0.6,
    })({
      token: 'token',
    } as any);
    expect(results).toEqual({
      max_key: 5,
      target_valence: 0.6,
    });
  });
  it('should join seeds', async () => {
    const results = await getRecommendations({
      seed_artists: ['1VwDG9aBflQupaFNjUru9A', '4k5fFEYgkWYrYvtOK3zVBl'],
      seed_genres: ['rock', 'pop'],
      seed_tracks: ['3T4s8KFP2SGW7hfmbcICsv', '2occELokWRfqLIlQJhJLZ6'],
    })({
      token: 'token',
    } as any);
    expect(results).toEqual({
      seed_artists: '1VwDG9aBflQupaFNjUru9A,4k5fFEYgkWYrYvtOK3zVBl',
      seed_genres: 'rock,pop',
      seed_tracks: '3T4s8KFP2SGW7hfmbcICsv,2occELokWRfqLIlQJhJLZ6',
    });
  });
});

const mockedRecommendations: Recommendations = {
  seeds: [
    {
      initialPoolSize: 250,
      afterFilteringSize: 0,
      afterRelinkingSize: 0,
      id: '5BgbppXSeh0lLXa9EPWxrQ',
      type: 'TRACK',
      href: 'https://api.spotify.com/v1/tracks/5BgbppXSeh0lLXa9EPWxrQ',
    },
  ],
  tracks: [
    {
      album: {
        album_type: 'ALBUM',
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/0ZxZlO7oWCSYMXhehpyMvE',
            },
            href: 'https://api.spotify.com/v1/artists/0ZxZlO7oWCSYMXhehpyMvE',
            id: '0ZxZlO7oWCSYMXhehpyMvE',
            name: 'COIN',
            type: 'artist',
            uri: 'spotify:artist:0ZxZlO7oWCSYMXhehpyMvE',
          },
        ],
        available_markets: ['KR'],
        external_urls: {
          spotify: 'https://open.spotify.com/album/3Z62dgkhjWCfLeZ8v9p2Td',
        },
        href: 'https://api.spotify.com/v1/albums/3Z62dgkhjWCfLeZ8v9p2Td',
        id: '3Z62dgkhjWCfLeZ8v9p2Td',
        images: [
          {
            height: 640,
            url: 'https://i.scdn.co/image/ab67616d0000b273667a552700a09676a52ccf0f',
            width: 640,
          },
          {
            height: 300,
            url: 'https://i.scdn.co/image/ab67616d00001e02667a552700a09676a52ccf0f',
            width: 300,
          },
          {
            height: 64,
            url: 'https://i.scdn.co/image/ab67616d00004851667a552700a09676a52ccf0f',
            width: 64,
          },
        ],
        name: 'Dreamland',
        release_date: '2020-02-21',
        release_date_precision: 'day',
        total_tracks: 14,
        type: 'album',
        uri: 'spotify:album:3Z62dgkhjWCfLeZ8v9p2Td',
      },
      artists: [
        {
          external_urls: {
            spotify: 'https://open.spotify.com/artist/0ZxZlO7oWCSYMXhehpyMvE',
          },
          href: 'https://api.spotify.com/v1/artists/0ZxZlO7oWCSYMXhehpyMvE',
          id: '0ZxZlO7oWCSYMXhehpyMvE',
          name: 'COIN',
          type: 'artist',
          uri: 'spotify:artist:0ZxZlO7oWCSYMXhehpyMvE',
        },
      ],
      available_markets: ['KR'],
      disc_number: 1,
      duration_ms: 188306,
      explicit: false,
      external_ids: {
        isrc: 'USSM11902799',
      },
      external_urls: {
        spotify: 'https://open.spotify.com/track/0X5mtNbqxbiTYkwj0CQc2f',
      },
      href: 'https://api.spotify.com/v1/tracks/0X5mtNbqxbiTYkwj0CQc2f',
      id: '0X5mtNbqxbiTYkwj0CQc2f',
      is_local: false,
      name: 'Crash My Car',
      popularity: 69,
      preview_url:
        'https://p.scdn.co/mp3-preview/d2fb58c422f5240ae8eb1f3c787425b3fa0321d7?cid=245d58dfb63e4691bcdc82bdb76fa66b',
      track_number: 4,
      type: 'track',
      uri: 'spotify:track:0X5mtNbqxbiTYkwj0CQc2f',
    },
  ],
};
