export const searchString = (...args: string[]): string => args.join(' ');

export const album = (album: string): string => `album:${album}`;

export const artist = (artist: string): string => `artist:${artist}`;

export const track = (track: string): string => `track:${track}`;

export const year = (year: number | string): string => `year:${year}`;

export const genre = (genre: string): string => `genre:${genre}`;

export const upc = (upc: string): string => `upc:${upc}`;

export const isrc = (isrc: string): string => `isrc:${isrc}`;

export const hipster = () => 'tag:hipster';

export const recent = () => 'tag:new';

export const not = (not: string) => `NOT:${not}`;
