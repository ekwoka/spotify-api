import { PaginatedList } from '../../core';
import { Album } from '../albums';
import { Artist } from '../artists';
import { PlaylistStub } from '../playlists';
import { Track } from '../tracks';

export type QueryType = {
  album: 'albums';
  artist: 'artists';
  playlist: 'playlists';
  track: 'tracks';
  show: 'shows';
  episode: 'episodes';
};

/* TODO: Finish Search Result Types */
export type PageType = {
  albums: PaginatedList<Album>;
  artists: PaginatedList<Artist>;
  playlists: PaginatedList<PlaylistStub>;
  tracks: PaginatedList<Track>;
  shows: PaginatedList<unknown>;
  episodes: PaginatedList<unknown>;
};

export type SearchResults<T extends keyof QueryType> = Pick<
  PageType,
  QueryType[T]
>;
