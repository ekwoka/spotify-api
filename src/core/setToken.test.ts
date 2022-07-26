import { describe, expect, it } from 'vitest';
import { PersistentApiProperties, setToken, spotifyApiClient } from './';

describe('Set Token', () => {
  it('should return a function', () => {
    expect(typeof setToken('')).toBe('function');
  });
  it('should return a function that mutates the token prop of passed object', () => {
    const setter = setToken('updated');
    const fakeProps: PersistentApiProperties = { token: 'initial' };
    setter(fakeProps);
    expect(fakeProps.token).toBe('updated');
  });
  it('should update token in spotifyApiClient', () => {
    const Spotify = spotifyApiClient('initial');
    Spotify(setToken('updated'));
    expect(Spotify((props) => props.token)).toBe('updated');
  });
});
