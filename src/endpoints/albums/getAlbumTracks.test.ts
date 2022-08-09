import { beforeAll } from 'vitest';
import { describe, expect, it } from 'vitest';
import { hasToken } from '../../../testingTools/hasToken';
import { makeMock } from '../../../testingTools/makeMock';
import { mockedAlbums, getAlbumTracks } from './';

describe('getAlbumTracks', () => {
  beforeAll(() => {
    makeMock('v1/albums?ids=TRACKS', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedAlbums,
        };
      },
    });
    makeMock('v1/albums?ids=TRACKS&market=EN', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: {
            albums: [
              {
                tracks: {
                  ...mockedAlbums.albums[0].tracks,
                  market: new URLSearchParams(req.path.split('?')[1]).get(
                    'market'
                  ),
                },
              },
            ],
          },
        };
      },
    });
  });

  it('should return a tracklist', async () => {
    const tracks = await getAlbumTracks('TRACKS')({
      token: 'token',
      cache: {},
    });
    expect(tracks).toEqual(mockedAlbums.albums[0].tracks);
  });

  it('should pass market as query param', async () => {
    const { market } = (await getAlbumTracks(
      'TRACKS',
      'EN'
    )({ token: 'token', cache: {} })) as unknown as { market: string };
    expect(market).toEqual('EN');
  });
});
