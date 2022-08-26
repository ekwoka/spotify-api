import {
  Image,
  SpotifyAPIURL,
  SpotifyPageURL,
} from '../../utils/SpotifyUtilityTypes';

export type Artist = ArtistStub & {
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  images: Image[];
  popularity: number;
};

export type ArtistStub = {
  external_urls: {
    spotify: SpotifyPageURL;
  };
  href: SpotifyAPIURL;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
};
