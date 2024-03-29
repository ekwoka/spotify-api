import { beforeAll, describe, expect, it } from 'vitest';

import { makeMock } from '../../../testingTools/makeMock';
import { getTopItems } from './';

describe('getTopItems', () => {
  beforeAll(() => {
    makeMock('v1/me/top/tracks', { data: mockedTracks }).persist();
    makeMock('v1/me/top/artists', { data: mockedArtists }).persist();
    makeMock('v1/me/top/testquery?limit=10', {
      handler: (thing) => {
        const paramString = thing.path.split('?')[1];
        const params = new URLSearchParams(paramString);
        return { statusCode: 200, data: { limit: params.get('limit') } };
      },
    }).persist();
  });
  it('should return top tracks', async () => {
    const tracks = await getTopItems('tracks')({
      token: 'token',
      cache: new Map(),
    });
    expect(Array.isArray(tracks.items)).toBe(true);
    expect(tracks.items[0].type).toBe('track');
  });
  it('should return top artists', async () => {
    const artists = await getTopItems('artists')({
      token: 'token',
      cache: new Map(),
    });
    expect(Array.isArray(artists.items)).toBe(true);
    expect(artists.items[0].type).toBe('artist');
  });
  it('should pass in query params', async () => {
    const tracks = await getTopItems('testquery' as 'artists', { limit: 10 })({
      token: 'token',
      cache: new Map(),
    });
    expect(tracks.limit).toBe('10');
  });
});

const mockedTracks = {
  items: [
    {
      album: {
        album_type: 'SINGLE',
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
        available_markets: [
          'AD',
          'AE',
          'AR',
          'AT',
          'AU',
          'BE',
          'BG',
          'BH',
          'BO',
          'BR',
          'CA',
          'CH',
          'CL',
          'CO',
          'CR',
          'CY',
          'CZ',
          'DE',
          'DK',
          'DO',
          'DZ',
          'EC',
          'EE',
          'EG',
          'ES',
          'FI',
          'FR',
          'GB',
          'GR',
          'GT',
          'HK',
          'HN',
          'HU',
          'ID',
          'IE',
          'IL',
          'IN',
          'IS',
          'IT',
          'JO',
          'JP',
          'KW',
          'LB',
          'LI',
          'LT',
          'LU',
          'LV',
          'MA',
          'MC',
          'MT',
          'MX',
          'MY',
          'NI',
          'NL',
          'NO',
          'NZ',
          'OM',
          'PA',
          'PE',
          'PH',
          'PL',
          'PS',
          'PT',
          'PY',
          'QA',
          'RO',
          'SA',
          'SE',
          'SG',
          'SK',
          'SV',
          'TH',
          'TN',
          'TR',
          'TW',
          'US',
          'UY',
          'VN',
          'ZA',
        ],
        external_urls: {
          spotify: 'https://open.spotify.com/album/6tLZvqqoWszgPagzzNNQQF',
        },
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
        name: 'Seoul',
        release_date: '2022-04-20',
        release_date_precision: 'day',
        total_tracks: 5,
        type: 'album',
        uri: 'spotify:album:6tLZvqqoWszgPagzzNNQQF',
      },
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
      available_markets: [
        'AD',
        'AE',
        'AR',
        'AT',
        'AU',
        'BE',
        'BG',
        'BH',
        'BO',
        'BR',
        'CA',
        'CH',
        'CL',
        'CO',
        'CR',
        'CY',
        'CZ',
        'DE',
        'DK',
        'DO',
        'DZ',
        'EC',
        'EE',
        'EG',
        'ES',
        'FI',
        'FR',
        'GB',
        'GR',
        'GT',
        'HK',
        'HN',
        'HU',
        'ID',
        'IE',
        'IL',
        'IN',
        'IS',
        'IT',
        'JO',
        'JP',
        'KW',
        'LB',
        'LI',
        'LT',
        'LU',
        'LV',
        'MA',
        'MC',
        'MT',
        'MX',
        'MY',
        'NI',
        'NL',
        'NO',
        'NZ',
        'OM',
        'PA',
        'PE',
        'PH',
        'PL',
        'PS',
        'PT',
        'PY',
        'QA',
        'RO',
        'SA',
        'SE',
        'SG',
        'SK',
        'SV',
        'TH',
        'TN',
        'TR',
        'TW',
        'US',
        'UY',
        'VN',
        'ZA',
      ],
      disc_number: 1,
      duration_ms: 204760,
      explicit: false,
      external_ids: {
        isrc: 'KRA922200007',
      },
      external_urls: {
        spotify: 'https://open.spotify.com/track/4b9LMCUaw55QajVRfrfPyS',
      },
      href: 'https://api.spotify.com/v1/tracks/4b9LMCUaw55QajVRfrfPyS',
      id: '4b9LMCUaw55QajVRfrfPyS',
      is_local: false,
      name: 'Seoul',
      popularity: 54,
      preview_url:
        'https://p.scdn.co/mp3-preview/2a59b2615f90941494d5dac5d553e681a4eb1a50?cid=245d58dfb63e4691bcdc82bdb76fa66b',
      track_number: 2,
      type: 'track',
      uri: 'spotify:track:4b9LMCUaw55QajVRfrfPyS',
    },
  ],
  total: 50,
  limit: 10,
  offset: 0,
  href: 'https://api.spotify.com/v1/me/top/tracks?limit=10&offset=0',
  previous: null,
  next: 'https://api.spotify.com/v1/me/top/tracks?limit=10&offset=10',
};

const mockedArtists = {
  items: [
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
  total: 50,
  limit: 10,
  offset: 0,
  href: 'https://api.spotify.com/v1/me/top/tracks?limit=10&offset=0',
  previous: null,
  next: 'https://api.spotify.com/v1/me/top/tracks?limit=10&offset=10',
};
