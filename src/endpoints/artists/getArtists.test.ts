import { beforeAll } from 'vitest';
import { describe, expect, it } from 'vitest';
import { hasToken } from '../../../testingTools/hasToken';
import { makeMock } from '../../../testingTools/makeMock';
import { getArtists } from '.';
import WeakLRUCache from '@ekwoka/weak-lru-cache';

describe('getArtists', () => {
  beforeAll(() => {
    makeMock('v1/artists?ids=1VwDG9aBflQupaFNjUru9A%2C41MozSoPIsD1dJM0CLPjZF', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedArtists,
        };
      },
    });
  });

  it('should return an artist list', async () => {
    const artists = await getArtists([
      '1VwDG9aBflQupaFNjUru9A',
      '41MozSoPIsD1dJM0CLPjZF',
    ])({
      token: 'token',
      cache: WeakLRUCache(),
    });
    expect(artists).toEqual(mockedArtists);
  });
});

const mockedArtists = {
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/1VwDG9aBflQupaFNjUru9A',
      },
      followers: {
        href: null,
        total: 472210,
      },
      genres: [],
      href: 'https://api.spotify.com/v1/artists/1VwDG9aBflQupaFNjUru9A',
      id: '1VwDG9aBflQupaFNjUru9A',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab6761610000e5ebbb55fc616733b6c09d48481f',
          width: 640,
        },
        {
          height: 320,
          url: 'https://i.scdn.co/image/ab67616100005174bb55fc616733b6c09d48481f',
          width: 320,
        },
        {
          height: 160,
          url: 'https://i.scdn.co/image/ab6761610000f178bb55fc616733b6c09d48481f',
          width: 160,
        },
      ],
      name: 'NAYEON',
      popularity: 71,
      type: 'artist',
      uri: 'spotify:artist:1VwDG9aBflQupaFNjUru9A',
    },
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/41MozSoPIsD1dJM0CLPjZF',
      },
      followers: {
        href: null,
        total: 31943993,
      },
      genres: ['k-pop', 'k-pop girl group'],
      href: 'https://api.spotify.com/v1/artists/41MozSoPIsD1dJM0CLPjZF',
      id: '41MozSoPIsD1dJM0CLPjZF',
      images: [
        {
          height: 640,
          url: 'https://i.scdn.co/image/ab6761610000e5eb7b6160c954c6a5b7d4756608',
          width: 640,
        },
        {
          height: 320,
          url: 'https://i.scdn.co/image/ab676161000051747b6160c954c6a5b7d4756608',
          width: 320,
        },
        {
          height: 160,
          url: 'https://i.scdn.co/image/ab6761610000f1787b6160c954c6a5b7d4756608',
          width: 160,
        },
      ],
      name: 'BLACKPINK',
      popularity: 83,
      type: 'artist',
      uri: 'spotify:artist:41MozSoPIsD1dJM0CLPjZF',
    },
  ],
};
