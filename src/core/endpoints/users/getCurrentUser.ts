import { deepFreeze, spotifyFetch } from '../../../utils';
import { cache } from '../../cache';
import { QueryConstructorWithOptionalArgs, User } from '../../';

/**
 * Accesses the Spotify /me endpoint to get information regarding the current
 * user. The User data is cached and put in deep freeze to prevent needing
 * to refetch the data or having other functions modify the cached data
 * @returns {User}
 */
export const getCurrentUser: QueryConstructorWithOptionalArgs<
  GetCurrentUserArgs,
  Promise<User>
> =
  (args: GetCurrentUserArgs = { bypassCache: false }) =>
  async ({ token }) => {
    if (cache.user && !args.bypassCache) return cache.user;

    const endpoint = `me`;
    const data = await spotifyFetch<User>(endpoint, token);

    deepFreeze(data);

    cache.user = data;
    return data;
  };

// this interface is not in types.ts because its use case is very specific to this file, and not used globally
interface GetCurrentUserArgs {
  bypassCache?: boolean;
}
