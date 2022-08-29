import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { addToQueue } from './';

describe('addToQueue', () => {
  beforeAll(() => {
    makeMock('v1/me/player/queue?uri=uri', {
      method: 'POST',
      handler: (req) => {
        if (!hasToken(req.headers as any)) return { statusCode: 401 };
        return { statusCode: 204 };
      },
    });
  });
  it('should return a function', () => {
    expect(typeof addToQueue('uri')).toBe('function');
  });
  it('should add a track to the queue', async () => {
    const results = await addToQueue('uri')({
      token: 'token',
    } as any);
    expect(results).toBeNull();
  });
});
