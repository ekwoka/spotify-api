import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { getPlaylist, Playlist } from '.';

describe('getPlaylist', () => {
  beforeAll(() => {
    makeMock('v1/playlists/37i9dQZF1DX5g856aiKiDS', {
      handler: (req) => {
        if (!hasToken(req.headers as any))
          return {
            statusCode: 401,
          };
        return {
          statusCode: 200,
          data: mockedPlaylist,
        };
      },
    });
  });
  it('should return a function', () => {
    expect(typeof getPlaylist('37i9dQZF1DX5g856aiKiDS')).toBe('function');
  });
  it('should fetch a playlist', async () => {
    const playlist = await getPlaylist('37i9dQZF1DX5g856aiKiDS')({
      token: 'token',
    } as any);
    expect(playlist).toEqual(mockedPlaylist);
  });
});

const mockedPlaylist: Playlist = {
  collaborative: false,
  description:
    "Chill Korean tunes that's perfect with your latte or americano. (카페와 어울리는 편안한 음악들을 감상하세요.)",
  external_urls: {
    spotify: 'https://open.spotify.com/playlist/37i9dQZF1DX5g856aiKiDS',
  },
  followers: {
    href: null,
    total: 412180,
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
  primary_color: '#ffffff',
  public: false,
  snapshot_id:
    'MTY2MDg5NDc0MywwMDAwMDAwMGJlNGI0MDNlNTBjMTcyZWVlMThkNmU3MmQ1YTg5ZjQy',
  tracks: {
    href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DX5g856aiKiDS/tracks?offset=0&limit=100&locale=en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
    items: [
      {
        added_at: '2022-08-19T07:39:03Z',
        added_by: {
          external_urls: {
            spotify: 'https://open.spotify.com/user/',
          },
          href: 'https://api.spotify.com/v1/users/',
          id: '',
          type: 'user',
          uri: 'spotify:user:',
        },
        is_local: false,
        primary_color: null,
        track: {
          album: {
            album_type: 'single',
            artists: [
              {
                external_urls: {
                  spotify:
                    'https://open.spotify.com/artist/27hEewoah5kfsSOotYHJG6',
                },
                href: 'https://api.spotify.com/v1/artists/27hEewoah5kfsSOotYHJG6',
                id: '27hEewoah5kfsSOotYHJG6',
                name: 'nynas',
                type: 'artist',
                uri: 'spotify:artist:27hEewoah5kfsSOotYHJG6',
              },
            ],
            available_markets: ['KR'],
            external_urls: {
              spotify: 'https://open.spotify.com/album/3foqu7kaVnLvLPUNmgbNUS',
            },
            href: 'https://api.spotify.com/v1/albums/3foqu7kaVnLvLPUNmgbNUS',
            id: '3foqu7kaVnLvLPUNmgbNUS',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab67616d0000b2739f05f2aa9f7b023682d13fd6',
                width: 640,
              },
              {
                height: 300,
                url: 'https://i.scdn.co/image/ab67616d00001e029f05f2aa9f7b023682d13fd6',
                width: 300,
              },
              {
                height: 64,
                url: 'https://i.scdn.co/image/ab67616d000048519f05f2aa9f7b023682d13fd6',
                width: 64,
              },
            ],
            name: 'Be-e-e-e',
            release_date: '2022-08-17',
            release_date_precision: 'day',
            total_tracks: 2,
            type: 'album',
            uri: 'spotify:album:3foqu7kaVnLvLPUNmgbNUS',
          },
          artists: [
            {
              external_urls: {
                spotify:
                  'https://open.spotify.com/artist/27hEewoah5kfsSOotYHJG6',
              },
              href: 'https://api.spotify.com/v1/artists/27hEewoah5kfsSOotYHJG6',
              id: '27hEewoah5kfsSOotYHJG6',
              name: 'nynas',
              type: 'artist',
              uri: 'spotify:artist:27hEewoah5kfsSOotYHJG6',
            },
          ],
          available_markets: ['KR'],
          disc_number: 1,
          duration_ms: 140226,
          episode: false,
          explicit: false,
          external_ids: {
            isrc: 'KRMIM2243649',
          },
          external_urls: {
            spotify: 'https://open.spotify.com/track/3SReD892lOtkOUL4p8Tu92',
          },
          href: 'https://api.spotify.com/v1/tracks/3SReD892lOtkOUL4p8Tu92',
          id: '3SReD892lOtkOUL4p8Tu92',
          is_local: false,
          name: 'Be-e-e-e',
          popularity: 38,
          preview_url:
            'https://p.scdn.co/mp3-preview/a94e7a15784f4f079c889064365481d1a09ef552?cid=774b29d4f13844c495f206cafdad9c86',
          track: true,
          track_number: 1,
          type: 'track',
          uri: 'spotify:track:3SReD892lOtkOUL4p8Tu92',
        },
        video_thumbnail: {
          url: null,
        },
      },
    ],
    limit: 100,
    next: null,
    offset: 0,
    previous: null,
    total: 50,
  },
  type: 'playlist',
  uri: 'spotify:playlist:37i9dQZF1DX5g856aiKiDS',
};
