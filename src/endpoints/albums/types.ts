import { SpotifyAPIURL, SpotifyPageURL, Image } from '../../utils';
import { ArtistStub } from '../artists/';
import { Track } from '../tracks/';

export type AlbumStub = {
  album_type: 'single' | 'album' | 'compilation';
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

export type Album = AlbumStub & {
  restrictions?: {
    reason: 'market' | 'product' | 'explicit';
  };
  tracks: TrackList;
};
export type TrackList = {
  href: SpotifyAPIURL;
  items: Track[];
  limit: number;
  next: SpotifyAPIURL | null;
  offset: number;
  previous: SpotifyAPIURL | null;
  total: number;
};
