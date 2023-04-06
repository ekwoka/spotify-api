import { Copyrights } from '../../core/types';
import { Image, SpotifyAPIURL, SpotifyPageURL } from '../../utils';
import { ArtistStub } from '../artists/';
import { TrackStub } from '../tracks/types';

export type AlbumStub = {
  album_type:
    | 'SINGLE'
    | 'ALBUM'
    | 'COMPILATION'
    | 'single'
    | 'album'
    | 'compilation';
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
  copyrights?: Copyrights;
  external_ids: Record<string, string>;
  genres: string[];
  label: string;
  popularity: number;
};
export type TrackList = {
  href: SpotifyAPIURL;
  items: TrackStub[];
  limit: number;
  next: SpotifyAPIURL | null;
  offset: number;
  previous: SpotifyAPIURL | null;
  total: number;
};
