import { SPOTIFY_URL } from '../../../constants';
import { deepFreeze } from '../../../utils';
import { spotifyFetch } from '../../../utils/spotifyFetch';
import { QueryConstructor } from '../../spotifyApi';

let cachedUser: User | undefined;

export const getCurrentUser: QueryConstructor<Promise<User>> =
  () =>
  async ({ current: token }) => {
    if (cachedUser) return cachedUser;
    const endpoint = `me`;
    const data = await spotifyFetch<User>(endpoint, token);
    deepFreeze(data);
    cachedUser = data;
    return data;
  };

type User = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: true;
    filter_locked: true;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  product: string;
  type: string;
  uri: string;
};
