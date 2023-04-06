import { beforeAll, describe, expect, it } from 'vitest';

import { makeMock } from '../../../testingTools/makeMock';
import { getCurrentUser } from './';

describe('Get Current User', () => {
  beforeAll(() => {
    makeMock('v1/me', { data: mockedUser }).persist();
  });
  it('should return Current User', async () => {
    const user = await getCurrentUser()({
      token: 'token',
      cache: new Map(),
    });
    expect(user.email).toBeDefined();
  });
  it('should cache user and return it from cache', async () => {
    const cache = new Map();
    expect(await getCurrentUser()({ token: 'token', cache })).toBe(
      cache.get('user')
    );
    expect(await getCurrentUser()({ token: 'token', cache })).toBe(
      await getCurrentUser()({ token: 'token', cache })
    );
  });
});

const mockedUser = {
  country: 'string',
  display_name: 'string',
  email: 'string',
  explicit_content: {
    filter_enabled: true,
    filter_locked: true,
  },
  external_urls: {
    spotify: 'string',
  },
  followers: {
    href: 'string',
    total: 0,
  },
  href: 'string',
  id: 'string',
  images: [
    {
      url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
      height: 300,
      width: 300,
    },
  ],
  product: 'string',
  type: 'string',
  uri: 'string',
};
