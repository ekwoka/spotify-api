import {
  Image,
  SpotifyAPIURL,
  SpotifyPageURL,
} from '../../utils/SpotifyUtilityTypes';

export type Artist = {
  external_urls: {
    spotify: SpotifyPageURL;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  href: SpotifyAPIURL;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: 'artist';
  uri: string;
};

export type ArtistStub = {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
};
