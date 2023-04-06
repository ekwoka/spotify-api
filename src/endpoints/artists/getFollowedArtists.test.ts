import { beforeAll, describe, expect, it } from 'vitest';

import { hasToken, makeMock } from '../../../testingTools';
import { getFollowedArtists } from './';

describe('getFollowedArtists', () => {
  beforeAll(() => {
    makeMock('v1/me/following?type=artist', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedFollowing,
        };
      },
    });
    makeMock('v1/me/following?after=jessi&limit=1&type=artist', {
      handler: (req) => {
        if (!hasToken(req.headers as any))
          return {
            statusCode: 401,
          };
        const params = new URLSearchParams(req.path.split('?')[1]);
        const [limit, after, type] = ['limit', 'after', 'type'].map((param) =>
          params.get(param)
        );
        return {
          statusCode: 200,
          data: {
            artists: {
              items: [],
            },
            limit,
            after,
            type,
          },
        };
      },
    });
  });
  it('should return a function', () => {
    expect(typeof getFollowedArtists()).toBe('function');
  });
  it('should return followed artists', async () => {
    const results = await getFollowedArtists('artist')({
      token: 'token',
      cache: new Map(),
    } as any);
    expect(results).toEqual(mockedFollowing);
  });
  it('should handle limit & after', async () => {
    const results = await getFollowedArtists('artist', {
      limit: 1,
      after: 'jessi',
    })({
      token: 'token',
      cache: new Map(),
    } as any);
    expect(results).toEqual({
      artists: {
        items: [],
      },
      limit: '1',
      after: 'jessi',
      type: 'artist',
    });
  });
});

const mockedFollowing = {
  artists: {
    items: [
      {
        external_urls: {
          spotify: 'https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02',
        },
        followers: {
          href: null,
          total: 60707457,
        },
        genres: ['pop'],
        href: 'https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02',
        id: '06HL4z0CvFAxyc27GXpf02',
        images: [
          {
            height: 640,
            url: 'https://i.scdn.co/image/ab6761610000e5eb5a00969a4698c3132a15fbb0',
            width: 640,
          },
          {
            height: 320,
            url: 'https://i.scdn.co/image/ab676161000051745a00969a4698c3132a15fbb0',
            width: 320,
          },
          {
            height: 160,
            url: 'https://i.scdn.co/image/ab6761610000f1785a00969a4698c3132a15fbb0',
            width: 160,
          },
        ],
        name: 'Taylor Swift',
        popularity: 99,
        type: 'artist',
        uri: 'spotify:artist:06HL4z0CvFAxyc27GXpf02',
      },
    ],
    next: 'https://api.spotify.com/v1/me/following?type=artist&after=06HL4z0CvFAxyc27GXpf02&limit=1&locale=en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
    total: 5,
    cursors: {
      after: '06HL4z0CvFAxyc27GXpf02',
    },
    limit: 1,
    href: 'https://api.spotify.com/v1/me/following?type=artist&limit=1&locale=en-US,en;q=0.9,ko-KR;q=0.8,ko;q=0.7',
  },
};
