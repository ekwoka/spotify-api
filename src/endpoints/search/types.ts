import { PaginatedList } from '../../core';
import { Album } from '../albums';
import { Artist } from '../artists';
import { Track } from '../tracks';

export type QueryType =
  | 'album'
  | 'artist'
  | 'playlist'
  | 'track'
  | 'show'
  | 'episode';

export type QueryMap = {
  album: 'albums';
  artist: 'artists';
  playlist: 'playlists';
  track: 'tracks';
  show: 'shows';
  episode: 'episodes';
};

export type PageType = {
  album: PaginatedList<Album>;
  artist: PaginatedList<Artist>;
  playlist: PaginatedList<unknown>;
  track: PaginatedList<Track>;
  show: PaginatedList<unknown>;
  episode: PaginatedList<unknown>;
};

export type SearchResults<T extends QueryType> = Record<
  QueryMap[T],
  PageType[T]
>;
