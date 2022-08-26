import { PaginatedList } from '../../core';
import { Image, SpotifyAPIURL, SpotifyPageURL } from '../../utils';
import { Track } from '../tracks';

export type Playlist = Omit<PlaylistStub, 'tracks'> & {
  followers: {
    href: null;
    total: number;
  };
  tracks: PaginatedList<PlaylistItem>;
};

type PlaylistItem = {
  added_at: string;
  added_by: {
    external_urls: {
      spotify: SpotifyPageURL;
    };
    href: SpotifyAPIURL;
    id: string;
    type: 'user';
    uri: string;
  };
  primary_color: null;
  is_local: false;
  track: Track & {
    episode: boolean;
  };
  video_thumbnail: {
    url: string | null;
  };
};

export type PlaylistStub = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: SpotifyPageURL;
  };
  href: SpotifyAPIURL;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: SpotifyPageURL;
    };
    href: SpotifyAPIURL;
    id: string;
    type: 'user';
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: SpotifyAPIURL;
    total: number;
  };
  type: 'playlist';
  uri: string;
};
