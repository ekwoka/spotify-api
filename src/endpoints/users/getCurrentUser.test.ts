import 'dotenv/config';
import { beforeAll, describe, expect, it } from 'vitest';
import { makeMock } from '../../../testingTools/makeMock';
import { spotifyApiClient } from '../../core/spotifyApiClient';
import { getCurrentUser } from './getCurrentUser';

describe('Get Current User', () => {
  beforeAll(() => {
    makeMock('v1/me', { data: mockedUser });
  });
  it('should return Current User', async () => {
    const spotify = spotifyApiClient('token');
    const user = await spotify(getCurrentUser());
    expect(user.email).toBeDefined();
  });
  it('should cache user and return it from cache', async () => {
    const spotify = spotifyApiClient('token');
    const user = await spotify(getCurrentUser());
    expect(await spotify(getCurrentUser())).toBe(user);
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
