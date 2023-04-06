import { QueryFunction } from '../../core';
import { SpotifyAPIURL, SpotifyPageURL, spotifyFetch } from '../../utils';
import { Track } from '../tracks';

export const currentlyPlayingTrack =
  (): QueryFunction<Promise<CurrentlyPlayingTrack>> =>
  async ({ token }) => {
    const endpoint = 'me/player/currently-playing';
    try {
      return await spotifyFetch<CurrentlyPlayingTrack>(endpoint, token);
    } catch (e) {
      if (e.message.includes('end of JSON')) return null;
      throw e;
    }
  };

export type CurrentlyPlayingTrack = {
  device: {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: 'computer' | 'smartphone' | 'speaker';
    volume_percent: number;
  };
  repeat_state: 'off' | 'track' | 'context';
  shuffle_state: 'on' | 'off';
  context: {
    type: 'artist' | 'playlist' | 'album' | 'show';
    href: SpotifyAPIURL;
    external_urls: {
      spotify: SpotifyPageURL;
    };
    uri: 'string';
  };
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track;
  currently_playing_type: 'track' | 'episode' | 'ad' | 'unknown';
  actions: {
    interrupting_playback: boolean;
    pausing: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
    toggling_repeat_context: boolean;
    toggling_shuffle: boolean;
    toggling_repeat_track: boolean;
    transferring_playback: boolean;
  };
};
