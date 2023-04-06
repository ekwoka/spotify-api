import { beforeAll } from 'vitest';
import { describe, expect, it } from 'vitest';

import { getArtist } from '.';
import { hasToken } from '../../../testingTools/hasToken';
import { makeMock } from '../../../testingTools/makeMock';

describe('getArtist', () => {
  beforeAll(() => {
    makeMock('v1/artists?ids=1VwDG9aBflQupaFNjUru9A', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedArtists,
        };
      },
    }).persist();
  });
  it('should return an artist', async () => {
    const artist = await getArtist('1VwDG9aBflQupaFNjUru9A')({
      token: 'token',
      cache: new Map(),
    });
    expect(artist).toEqual(mockedArtists.artists[0]);
  });
  it('caches artist result', async () => {
    const cache = new Map();
    const artist1 = await getArtist('1VwDG9aBflQupaFNjUru9A')({
      token: 'token',
      cache,
    });
    expect(cache.get('artist.1VwDG9aBflQupaFNjUru9A')).toBe(artist1);
    const artist2 = await getArtist('1VwDG9aBflQupaFNjUru9A')({
      token: 'token',
      cache,
    });
    expect(artist1).toBe(artist2);
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
  ],
};
