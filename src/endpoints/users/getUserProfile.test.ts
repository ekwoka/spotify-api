import { beforeAll, describe, expect, it } from 'vitest';
import { makeMock } from '../../../testingTools/makeMock';
import { getUserProfile } from './';

describe('getUserProfile', () => {
  beforeAll(() => {
    makeMock('v1/users/thekwoka', { data: mockedUser }).persist();
  });
  it('should return user profile', async () => {
    const user = await getUserProfile('thekwoka')({
      token: 'token',
      cache: {},
    });
    expect(user.display_name).toBe('string');
  });
});

const mockedUser = {
  display_name: 'string',
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
  type: 'user',
  uri: 'string',
};
