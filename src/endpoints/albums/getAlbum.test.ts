import { beforeAll } from 'vitest';
import { describe, expect, it } from 'vitest';
import { hasToken } from '../../../testingTools/hasToken';
import { makeMock } from '../../../testingTools/makeMock';
import { getAlbum } from './';
import { mockedAlbums } from './getAlbums.test.js';

describe('getAlbum', () => {
  beforeAll(() => {
    makeMock('v1/albums?ids=GOOD', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedAlbums,
        };
      },
    });
    makeMock('v1/albums?ids=GOOD&market=EN', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: {
            albums: [
              {
                ...mockedAlbums.albums[0],
                market: new URLSearchParams(req.path.split('?')[1]).get(
                  'market'
                ),
              },
            ],
          },
        };
      },
    });
  });
  it('should return an album', async () => {
    const album = await getAlbum('GOOD')({ token: 'token', cache: {} });
    expect(album).toEqual(mockedAlbums.albums[0]);
  });
  it('should pass market as query param', async () => {
    const { market } = (await getAlbum(
      'GOOD',
      'EN'
    )({ token: 'token', cache: {} })) as unknown as { market: string };
    expect(market).toEqual('EN');
  });
});
