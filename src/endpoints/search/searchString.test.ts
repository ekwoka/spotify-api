import { describe, expect, it } from 'vitest';

import { searchString } from '.';

describe('searchString Helpers', () => {
  it('should parse query object to string', () => {
    const search = searchString({
      q: 'pink venom',
      artist: 'blackpink',
      album: 'pink venom',
      year: '2022',
      genre: 'pop',
      upc: '123456789',
      isrc: '123456789',
      tag: 'hipster',
    });
    expect(search).toBe(
      'pink venom artist:blackpink album:pink venom year:2022 genre:pop upc:123456789 isrc:123456789 tag:hipster',
    );
  });
});
