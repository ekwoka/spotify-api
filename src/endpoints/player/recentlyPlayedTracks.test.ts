import { beforeAll, describe, expect, it } from 'vitest';

import { hasToken, makeMock } from '../../../testingTools';
import { PersistentApiProperties } from '../../core';
import { RecentlyPlayedTrackList, recentlyPlayedTracks } from './';

describe('recentlyPlayedTracks', () => {
  beforeAll(() => {
    makeMock('v1/me/player/recently-played', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedRecentlyPlayed,
        };
      },
    });
    makeMock('v1/me/player/recently-played?limit=10&before=1000&after=0', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        const params = new URLSearchParams(req.path.split('?')[1]);
        const [after, before, limit] = ['after', 'before', 'limit'].map((key) =>
          Number(params.get(key)),
        );
        return {
          statusCode: 200,
          data: {
            after,
            before,
            limit,
          },
        };
      },
    });
  });
  it('should return a function', () => {
    expect(typeof recentlyPlayedTracks()).toBe('function');
  });
  it('should return a tracklist', async () => {
    const results = await recentlyPlayedTracks()({
      token: 'token',
    } as PersistentApiProperties);
    expect(Array.isArray(results.items)).toBe(true);
  });
  it('should accept options', async () => {
    const results = (await recentlyPlayedTracks({
      limit: 10,
      before: 1000,
      after: 0,
    })({
      token: 'token',
    } as PersistentApiProperties)) as any;
    expect(results).toEqual({
      limit: 10,
      before: 1000,
      after: 0,
    });
  });
});

const mockedRecentlyPlayed: RecentlyPlayedTrackList = {
  items: [
    {
      track: {
        album: {
          album_type: 'single',
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/6NdzNrBP8Jbhzp6h7yojht',
              },
              href: 'https://api.spotify.com/v1/artists/6NdzNrBP8Jbhzp6h7yojht',
              id: '6NdzNrBP8Jbhzp6h7yojht',
              name: 'CHEEZE',
              type: 'artist',
              uri: 'spotify:artist:6NdzNrBP8Jbhzp6h7yojht',
            },
          ],
          available_markets: ['KR'],
          external_urls: {
            spotify: 'https://open.spotify.com/album/18QFWd8sXbRzeviP7ND7mr',
          },
          href: 'https://api.spotify.com/v1/albums/18QFWd8sXbRzeviP7ND7mr',
          id: '18QFWd8sXbRzeviP7ND7mr',
          images: [
            {
              height: 640,
              url: 'https://i.scdn.co/image/ab67616d0000b27339c7454642976afe9061b19e',
              width: 640,
            },
            {
              height: 300,
              url: 'https://i.scdn.co/image/ab67616d00001e0239c7454642976afe9061b19e',
              width: 300,
            },
            {
              height: 64,
              url: 'https://i.scdn.co/image/ab67616d0000485139c7454642976afe9061b19e',
              width: 64,
            },
          ],
          name: 'Q',
          release_date: '2016-06-16',
          release_date_precision: 'day',
          total_tracks: 5,
          type: 'album',
          uri: 'spotify:album:18QFWd8sXbRzeviP7ND7mr',
        },
        artists: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/6NdzNrBP8Jbhzp6h7yojht',
            },
            href: 'https://api.spotify.com/v1/artists/6NdzNrBP8Jbhzp6h7yojht',
            id: '6NdzNrBP8Jbhzp6h7yojht',
            name: 'CHEEZE',
            type: 'artist',
            uri: 'spotify:artist:6NdzNrBP8Jbhzp6h7yojht',
          },
        ],
        available_markets: ['KR'],
        disc_number: 1,
        duration_ms: 205693,
        explicit: false,
        external_ids: {
          isrc: 'UK6821400889',
        },
        external_urls: {
          spotify: 'https://open.spotify.com/track/1xfu5RELA5t2E2KeOG2ePD',
        },
        href: 'https://api.spotify.com/v1/tracks/1xfu5RELA5t2E2KeOG2ePD',
        id: '1xfu5RELA5t2E2KeOG2ePD',
        is_local: false,
        name: 'How Do You Think',
        popularity: 44,
        preview_url:
          'https://p.scdn.co/mp3-preview/0055c4239cad8369ab666a9e8ccea25ec868f4d4?cid=774b29d4f13844c495f206cafdad9c86',
        track_number: 2,
        type: 'track',
        uri: 'spotify:track:1xfu5RELA5t2E2KeOG2ePD',
      },
      played_at: '2022-08-23T08:39:00.566Z',
      context: {
        external_urls: {
          spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX5g856aiKiDS',
        },
        href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX5g856aiKiDS',
        type: 'playlist',
        uri: 'spotify:playlist:37i9dQZF1DX5g856aiKiDS',
      },
    },
  ],
  next: 'https://api.spotify.com/v1/me/player/recently-played?before=1661243940566&limit=1',
  cursors: {
    after: '1661243940566',
    before: '1661243940566',
  },
  limit: 1,
  href: 'https://api.spotify.com/v1/me/player/recently-played?limit=1',
};
