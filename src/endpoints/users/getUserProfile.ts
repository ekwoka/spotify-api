import { QueryFunction } from '../../core';
import { deepFreeze, Image, spotifyFetch, SpotifyPageURL } from '../../utils';

/**
 * Consumes the 'user/{user_id}' endpoint to return basic information about
 * other users, like curators of public playlists or friends of the user.
 * This returns a limited stub similar to the current user's own data.
 * @param user_id
 * @returns OtherUser
 */
export const getUserProfile =
  (user_id: string): QueryFunction<Promise<OtherUser>> =>
  async ({ token, cache }) => {
    const cached = cache.get(`user.${user_id}`);
    if (cached) return cached as OtherUser;
    const endpoint = `users/${user_id}`;
    const data = await spotifyFetch<OtherUser>(endpoint, token);
    cache.set(`user.${user_id}`, deepFreeze(data));
    return data;
  };

type OtherUser = {
  display_name: string;
  external_urls: {
    spotify: SpotifyPageURL;
  };
  followers: {
    href: null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  type: 'user';
  uri: string;
};
