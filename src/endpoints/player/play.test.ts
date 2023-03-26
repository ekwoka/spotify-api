import { hasToken, makeMock } from '../../../testingTools';
import { beforeAll, describe, expect, it } from 'vitest';
import { play } from './play';

describe('play', () => {
  let lastSentData: any;
  beforeAll(() => {
    makeMock('v1/me/player/play?', {
      method: 'PUT',
      handler: (req) => {
        if (!hasToken(req.headers as any)) return { statusCode: 401 };
        lastSentData = JSON.parse(req.body as string);
        return { statusCode: 204 };
      },
    }).persist();
    makeMock('v1/me/player/play?device_id=123', {
      method: 'PUT',
      handler: (req) => {
        if (!hasToken(req.headers as any)) return { statusCode: 401 };
        lastSentData = new URLSearchParams(req.path.split('?')[1]).get(
          'device_id'
        );
        return {
          statusCode: 204,
        };
      },
    });
  });
  it('should return a function', () => {
    expect(typeof play([])).toBe('function');
  });
  it('should send single context URI', async () => {
    await play('spotify:playlist:37i9dQZF1DX5g856aiKiDS')({
      token: '123',
    } as any);
    expect(lastSentData).toEqual({
      context_uri: 'spotify:playlist:37i9dQZF1DX5g856aiKiDS',
    });
  });
  it('should send multiple track URIs', async () => {
    await play([
      'spotify:track:6uEWYpv8HNAdbwHlqemG1F',
      'spotify:track:4b9LMCUaw55QajVRfrfPyS',
    ])({ token: '123' } as any);
    expect(lastSentData).toEqual({
      uris: [
        'spotify:track:6uEWYpv8HNAdbwHlqemG1F',
        'spotify:track:4b9LMCUaw55QajVRfrfPyS',
      ],
    });
  });
  it('should forward options', async () => {
    await play([], {
      offset: {
        position: 1,
      },
      position_ms: 1000,
    })({ token: 123 } as any);
    expect(lastSentData).toEqual({
      offset: {
        position: 1,
      },
      position_ms: 1000,
      uris: [],
    });
  });
  it('passes device_id in query', async () => {
    await play([], {
      device_id: '123',
    })({ token: '123' } as any);
    expect(lastSentData).toBe('123');
  });
});
