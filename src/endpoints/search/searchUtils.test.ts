import { describe, expect, it } from 'vitest';
import {
  searchString,
  artist,
  album,
  track,
  year,
  genre,
  hipster,
  isrc,
  not,
  recent,
  upc,
} from '.';

describe('searchString Helpers', () => {
  it('should combine strings', () => {
    expect(searchString('pink', 'venom')).toBe('pink venom');
  });
  it('should filter by artist', () => {
    expect(artist('blackpink')).toBe('artist:blackpink');
  });
  it('should filter by album', () => {
    expect(album('pink venom')).toBe('album:pink venom');
  });
  it('should filter by track', () => {
    expect(track('pink venom')).toBe('track:pink venom');
  });
  it('should filter by year', () => {
    expect(year(2019)).toBe('year:2019');
  });
  it('should filter by genre', () => {
    expect(genre('kpop')).toBe('genre:kpop');
  });
  it('should filter by upc', () => {
    expect(upc('1234567890123')).toBe('upc:1234567890123');
  });
  it('should filter by isrc', () => {
    expect(isrc('1234567890123')).toBe('isrc:1234567890123');
  });
  it('should filter by low popularity', () => {
    expect(hipster()).toBe('tag:hipster');
  });
  it('should filter by recent', () => {
    expect(recent()).toBe('tag:new');
  });
  it('should filter by not', () => {
    expect(not('pink')).toBe('NOT:pink');
  });
});
