import { SpotifyAPIURL, SpotifyPageURL } from '../../utils';

export type Context = {
  external_urls: {
    spotify: SpotifyPageURL;
  };
  href: SpotifyAPIURL;
  type: 'artist' | 'albums' | 'playlist' | 'show';
  uri: string;
};
