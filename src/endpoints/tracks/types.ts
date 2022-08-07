import {
  Image,
  SpotifyAPIURL,
  SpotifyPageURL,
} from '../../utils/SpotifyUtilityTypes';
import { ArtistStub } from '../artists/types';

export type Track = {
  album: AlbumStub;
  artists: ArtistStub[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls: {
    spotify: SpotifyPageURL;
  };
  href: SpotifyAPIURL;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
};

export type AlbumStub = {
  album_type: 'SINGLE' | 'ALBUM' | 'COMPILATION';
  artists: ArtistStub[];
  available_markets: string[];
  external_urls: {
    spotify: SpotifyPageURL;
  };
  href: SpotifyAPIURL;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: 'day' | 'month' | 'year';
  total_tracks: number;
  type: 'album';
  uri: string;
};
