import { SpotifyAPIURL, SpotifyPageURL } from '../../utils/SpotifyUtilityTypes';
import { AlbumStub } from '../albums';
import { ArtistStub } from '../artists/types';

export type Track = TrackStub & {
  album: AlbumStub;
  external_ids: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  popularity: number;
};

export type TrackStub = {
  artists: ArtistStub[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: SpotifyPageURL;
  };
  href: SpotifyAPIURL;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
};
