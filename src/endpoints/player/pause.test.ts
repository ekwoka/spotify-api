import { hasToken, makeMock } from '../../../testingTools';
import { beforeAll, describe, expect, it } from 'vitest';
import { pause } from './pause';

describe('pause', () => {
  beforeAll(() => {
    makeMock('v1/me/player/pause?', {
      method: 'PUT',
      handler: (req) => {
        if (!hasToken(req.headers as any)) return { statusCode: 401 };
        return { statusCode: 204 };
      },
    });
    makeMock('v1/me/player/pause?device_id=123', {
      method: 'PUT',
      handler: (req) => {
        if (!hasToken(req.headers as any)) return { statusCode: 401 };
        return {
          statusCode: 204,
        };
      },
    });
  });
  it('should return a function', () => expect(typeof pause()).toBe('function'));
  it('should pause the player', () =>
    expect(pause()({ token: '123' } as any)).resolves.toBeNull());
  it('should pass device_id to params', () =>
    expect(pause('123')({ token: '123' } as any)).resolves.toBeNull());
});
