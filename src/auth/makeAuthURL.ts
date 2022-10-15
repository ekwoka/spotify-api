import { toURLString } from '../utils';

export const makeAuthURL = (
  scopes: scope[],
  clientId?: string,
  redirectUri?: string
): string =>
  `https://accounts.spotify.com/authorize?${toURLString({
    response_type: 'code',
    client_id: clientId ?? process.env.SPOTIFY_CLIENT,
    scope: scopes.join(' '),
    redirect_uri: redirectUri ?? process.env.REDIRECT,
  })}`;

export type scope =
  | 'ugc-image-upload'
  | 'user-modify-playback-state'
  | 'user-read-playback-state'
  | 'user-read-currently-playing'
  | 'user-library-modify'
  | 'user-follow-read'
  | 'user-read-recently-played'
  | 'user-read-playback-position'
  | 'user-top-read'
  | 'playlist-read-collaborative'
  | 'playlist-modify-public'
  | 'playlist-read-private'
  | 'playlist-modify-private'
  | 'app-remote-control'
  | 'streaming'
  | 'user-read-email'
  | 'user-read-private'
  | 'user-library-modify'
  | 'user-library-read';
