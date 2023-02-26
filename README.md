# ⚡️A tree-shakable, composable, lightweight wrapper for the multiple Spotify APIs🔥

[<img src="https://img.shields.io/npm/v/@ekwoka/spotify-api?label=%20&style=for-the-badge&logo=pnpm&logoColor=white">](https://www.npmjs.com/package/@ekwoka/spotify-api)
<img src="https://img.shields.io/npm/types/@ekwoka/spotify-api?label=%20&amp;logo=typescript&amp;logoColor=white&amp;style=for-the-badge">
<img src="https://img.shields.io/npm/dt/@ekwoka/spotify-api?style=for-the-badge&logo=npm&logoColor=white" >
[<img src="https://img.shields.io/bundlephobia/minzip/@ekwoka/spotify-api?style=for-the-badge&logo=esbuild&logoColor=white">](https://bundlephobia.com/package/@ekwoka/spotify-api)
<img src="https://img.shields.io/badge/coverage-99%25-success?style=for-the-badge&logo=vitest&logoColor=white" alt="99% test coverage">

Born from my own difficulties using other wrapper libraries for Spotify, this library seeks to be the best possible API wrapper.

> NOTE: This library is still very much a work in progress and will be subject to breaking changes and regular updates until this note is removed.

## Why is this good?

- 🏷 Types out of the box!
- 🌴 Treeshakeable and composable!
- ⚡️ Improved performance from the intelligent use of caches and batching!
- 🏗 Consistent Behavior through normalized return types!
- 🦕 Supports Deno and Bun out of the box!

## Installation

Simply install with your favourite flavour of Package Manager

```bash
npm add @ekwoka/spotify-api
pnpm add @ekwoka/spotify-api
bun install @ekwoka/spotify-api
yarn add @ekwoka/spotify-api
```

## Usage

To get started, you'll need to import the core client from the package, and initialize it.

```js
import { SpotifyApi } from '@ekwoka/spotify-api';

export const client = SpotifyApi('tokenhere'); // client requires an initial token to initialize. Initialize client after recieving token from Spotify.
```

This will create the core client structure with which you'll manage and run requests to the Spotify Apis.

To update the token during ongoing usage simply, import and use the `setToken` composable with your client.

```js
import { SpotifyApi, setToken } from '@ekwoka/spotify-api';

const client = SpotifyApi('initial_token'); // original token

// after some event, update the token
client(setToken('my_new_token')); // updated token
```

As you'll notice, this is not a method on the client object like many other libraries. This is a composable function. The goal is for all interactions with the client and APIs to be composable functions. This will enable very aggressive tree-shaking to keep minimal clients from shipping lots of unused code, as well as enable code-splitting for larger applications. This should be reflected in a much more modest bundle size for the majority of use cases.

## Authentication

Includes in this package are some additional helper functions for interacting with Spotify's authentication API. These should only be used on a server, as they require client secrets.

These helpers are:

- `makeAuthURL`: Generates an Auth URL to direct the user to for logging in with Spotify OAuth
- `getTokenFromCode`: Accepts a code from the Spotify authentication flow and returns a suite of tokens (access and refresh).
- `refreshToken`: Accepts a refresh token and returns a new access token.

While these functions do allow passing in the valid parameters, you can also depend on evironment variables by setting up and exposing the following on the `process.env` object:

- `SPOTIFY_CLIENT`: Client id from Spotify Developer Dashboard.
- `SPOTIFY_SECRET`: Client secret.
- `REDIRECT`: URL to pass to Spotify Auth for handling the user returning to your app.

If these are not defined, the function will throw.

### Examples (Pseudo Express code)

```js
import {
  getTokenFromCode,
  refreshToken,
  makeAuthURL,
} from '@ekwoka/spotify-api';

const loginHandler = async (req, res) => {
  const url = makeAuthURL(['user-read-email'], CLIENT, REDIRECT);
  res.redirect(302, url);
};

const codeHandler = async (req, res) => {
  try {
    const { code } = JSON.parse(req.body);
    const { access_token, refresh_token } = await getTokenFromCode(
      code,
      CLIENT,
      SECRET
    );
    res.cookie('refresh_token', refresh_token);
    res.status(200).json({ access_token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refreshHandler = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;
    const { access_token } = await refreshToken(refresh_token, CLIENT, SECRET);
    res.status(200).json({ access_token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
```

## Endpoints

Endpoints are importable both from `@ekwoka/spotify-api` or `@ekwoka/spotify-api/endpoints` for convenience.

> NOTE: The following documentation uses the same structure as the Official Spotify Docs for organization

### Albums

Currently Available methods in the Albums category include:

- `getAlbum` - Retrieves info about an album by ID
- `getAlbums` - Retrieves info about multiple albums by ID
- `getAlbumTracks` - Retrieves info about an albums tracks

> While these correspond to 3 different endpoints to Spotify's API, internally these 3 use only the `getAlbums` endpoints for improved code-reuse.

Cachekey: `albums.[id]`
Batching Limit: 20

- `getSavedAlbums` - Retrieves a paginated list of albums in the user's library
- `albumIsSaved` - Retrieves whether a provided album id is in the user's library
- `saveAlbums` - Adds albums to the user's library
- `removeAlbums` - Removes albums from the user's library

> These last 3 all use batching to improve performance, and these 3 all also use a shared cache of in-Library states.

Cachekey: `saved.albums` (shared)
Batching Limit: 20

- `newReleases` - Retrieves a paginated result of new releases

#### getAlbum

Gets details of an Album by ID.

```js
const album = client(getAlbum('6tLZvqqoWszgPagzzNNQQF'));
const albumInMarket = client(getAlbum('6tLZvqqoWszgPagzzNNQQF', 'KR'));
```

#### getAlbums

Gets Details about multiple Albums at once.

```js
const albums = client(
  getAlbums(['6tLZvqqoWszgPagzzNNQQF', '6XBIkDFhDgc3PQOUEcO2fd'])
);
const albumsInMarket = client(
  getAlbums(['6tLZvqqoWszgPagzzNNQQF', '6XBIkDFhDgc3PQOUEcO2fd'], 'KR')
);
```

#### getAlbumTracks

Gets Track Info about Album

```js
const album = client(getAlbumTracks('6tLZvqqoWszgPagzzNNQQF'));
const albumInMarket = client(getAlbumTracks('6tLZvqqoWszgPagzzNNQQF', 'KR'));
```

#### getSavedAlbums

Gets a list of the users saved albums (those in the users library)

```js
const savedAlbums = client(getSavedAlbums());
const savedAlbumsLong = client(getSavedAlbums({ limit: 50 }));
```

Options:

- `limit`: The number of items to return. Default: `20`. Maximum: `50`.
- `offset`: The index of the first item to return. Default: `0`.
- `time_range`: Over what time frame the data is retrieved. Options: `short_term`, `medium_term`, `long_term`. Default: `medium_term`.

#### albumIsSaved

Gets whether the provided album IDs are present in the user's library. Works with single IDs or arrays of IDs.

```js
const isSaved = client(albumIsSaved('6tLZvqqoWszgPagzzNNQQF')); // true | false
const areSaved = client(
  albumIsSaved(['6tLZvqqoWszgPagzzNNQQF', '6XBIkDFhDgc3PQOUEcO2fd'])
); // [true, false]
```

#### saveAlbums

Puts album ID into the user's library. Returns `true` if successful. Works with single IDs or arrays of IDs.

```js
const isSaved = client(saveAlbums('6tLZvqqoWszgPagzzNNQQF')); // true
const wasSaved = client(
  saveAlbums(['6tLZvqqoWszgPagzzNNQQF', '6XBIkDFhDgc3PQOUEcO2fd'])
); // [true, true]
```

#### removeAlbums

Deletes album ID from the user's library. Returns `true` if successful. Works with single IDs or arrays of IDs.

```js
const isRemoved = client(removeAlbums('6tLZvqqoWszgPagzzNNQQF')); // true
const wasRemoved = client(
  removeAlbums(['6tLZvqqoWszgPagzzNNQQF', '6XBIkDFhDgc3PQOUEcO2fd'])
); // [true, true]
```

#### newReleases

Gets new Album releases, optionally scoped to a specific country

```js
const newReleases = client(newReleases());
const releasesWithOptions = client(
  newReleases({
    country: 'KR',
    limit: 50,
    offset: 0,
  })
);
```

Options:

- `limit`: The number of items to return. Default: `20`. Maximum: `50`.
- `offset`: The index of the first item to return. Default: `0`.
- `country`: Country code of results to return.

### Artists

Currently Available methods in the Albums category include:

- `getAlbum` - Retrieves info about an album by ID
- `getAlbums` - Retrieves info about multiple albums by ID

> While these correspond to 2 different endpoints to Spotify's API, internally these 3 use only the `getArtists` endpoints for improved code-reuse.

Cachekey: `arists.[id]`
Batching Limit: 50

- `getFollowedArtists` - Retrieves a list of artists followed by the user

#### getAlbum

Gets details of an Album by ID.

```js
const album = await client(getAlbum('6tLZvqqoWszgPagzzNNQQF'));
const albumInMarket = await client(getAlbum('6tLZvqqoWszgPagzzNNQQF', 'KR'));
```

#### getAlbums

Gets Details about multiple Albums at once.

```js
const albums = await client(
  getAlbums(['6tLZvqqoWszgPagzzNNQQF', '6XBIkDFhDgc3PQOUEcO2fd'])
);
const albumsInMarket = await client(
  getAlbums(['6tLZvqqoWszgPagzzNNQQF', '6XBIkDFhDgc3PQOUEcO2fd'], 'KR')
);
```

#### getFollowedArtists

Gets the list of artists followed by the current user.

```js
const followedArtists = await client(getFollowedArtists());
const followedArtists = await client(
  getFollowedArtists('artist', { limit: 50 })
);
```

Options:

- `limit`: The number of items to return. Default: `20`. Maximum: `50`.
- `after`: The ID of the artist provided at the end of the past page of results.

### Player

Endpoints included in the Player category include:

- `addToQueue` - Posts new item to the current playback queue
- `currentlyPlayingTrack` - Gets the current playing track
- `recentlyPlayedTracks` - Gets user's recently played tracks

#### addToQueue

Posts the provided item URI (track or episode) to the active playback queue.

```js
await client(addToQueue('spotify:track:5expoVGQPvXuwBBFuNGqBd'));
```

If there is any error, this function will throw (as with all endpoints) but will return `null` when successful.

#### currentlyPlayingTrack

Gets the currently playing track on the user's account.

```js
const currentlyPlaying = await client(currentlyPlayingTrack());
```

Returns `null` if no Track currently playing.

#### recentlyPlayedTracks

Get the user's recently played tracks and their playing context (like in a playlist or artist). Results can be filtered by play date

```js
const recentlyPlayed = await client(recentlyPlayed());
const recentlypPlayedFiltered = await client(
  recentlyPlayed({
    after: 1145736000000,
    before: 1653508800000,
    limit: 10,
  })
);
```

Options:

- `limit`: The number of items to return. Default: `20`. Maximum: `50`.
- `after`: UNIX timestamp of time after which results should return.
- `before`: UNIX timestamp of time before which results should return.

### Playlists

The following endpoints are available in the Playlists category:

- `getPlaylist` - Gets complete playlist information by playlist ID
- `getPlaylistItems` - Gets Items from playlist by ID
- `getUsersPlaylists` - Gets playlists created by or saved by the current user
- `savePlaylists` - Puts playlist(s) into user's library
- `removePlaylists` - Deletes playlist(s) from user's library

#### getPlaylist

Gets the complete playlist information by playlistID.

```js
const playlist = await client(getPlaylist('37i9dQZF1DX5g856aiKiDS'));
const playlistDescription = await client(
  getPlaylist('37i9dQZF1DX5g856aiKiDS', {
    fields: 'description',
  })
);
```

The options object accepts a fields string, which is a comma-separated list of the fields from the Playlist object to return. (This currently does not return the correct type when fields entry is used).

#### getPlaylistItems

Gets the items in a playlist (tracks and episodes)

> Note: When using `getPlaylist` the first 100 items are returned automatically, making this endpoint unnecessary when that suffices

```js
const tracks = await client(getPlaylistItems('37i9dQZF1DX5g856aiKiDS'));
const tracks = await client(
  getPlaylistItems('37i9dQZF1DX5g856aiKiDS', { limit: Infinity })
);
```

Options:

- `limit`: How many playlists to return in the results. (default: `100`)
- `offset`: How far into the list to start the results (default: `0`)
- `market`: Which markets to filter the returned items by

This endpoint dynamically bypasses the server-side limit cap of `100`. When larger limits are provided (and a playlist that has more than 100 items), this library will performa multiple requests to satisfy the limit. To retrieve the entire playlist, just provide a limit of `Infinity`

#### getUsersPlaylists

Gets the playlists created by or saved by the current user.

```js
const savedPlaylists = await client(getUsersPlaylists());
const fivePlaylists = await client(getUsersPlaylists({ limit: 5 }));
```

Options:

- `limit`: How many playlists to return in the results.
- `offset`: How far into the list to start the results

Playlists returned by this endpoint do not include track information.

#### savePlaylists

Puts playlist ID into the user's library. Returns `true` if successful. Works with single IDs or arrays of IDs.

```js
const isSaved = client(savePlaylists('0skYUMpS0AcbpjcGsAbRGj')); // true
const wasSaved = client(
  savePlaylists(['0skYUMpS0AcbpjcGsAbRGj', '60jFaQV7Z4boGC4ob5B5c6'])
); // [true, true]
```

#### removePlaylists

Deletes playlist ID from the user's library. Returns `true` if successful. Works with single IDs or arrays of IDs.

```js
const isRemoved = client(removePlaylists('0skYUMpS0AcbpjcGsAbRGj')); // true
const wasRemoved = client(
  removePlaylists(['0skYUMpS0AcbpjcGsAbRGj', '60jFaQV7Z4boGC4ob5B5c6'])
); // [true, true]
```

### Search

There is only one Search endpoint:

- `search`

Included is also a utility function for building more advanced query string.

#### search

This endpoint performs a query search of various Spotify data types and returns data on all of them.

```js
// Single Search Type
const results = client(search('pink venom', 'track'));

// Multiple Search Types
const results = client(search('pink venom', ['track', 'album']));

// With additional options
const results = client(
  search('pink venom', 'track', {
    limit: 50,
    offset: 0,
    market: 'KR',
    include_external: 'audio',
  })
);
```

- Arguments:
  1.  query: `string` _required_
  2.  type: `string | string[]` _required_
      - `track`
      - `album`
      - `artist`
      - `playlist`
      - `track`
      - `show`
      - `episode`
  3.  Options: `object`
      - `limit`: The number of items to return. Default: `20`. Maximum: `50`.
      - `offset`: The index of the first item to return. Default: `0`.
      - `market`: String representation of market.
      - `include_external`: Allows including references to playable content from outside Spotify. This defaults to nothing, and must be set to `audio` to include those references.

While other endpoints mostly have pretty concrete return types, this endpoint returns an object with keys that are the provided `type` strings with an `s` appended.

Example:

```js
client(search('pink venom', 'track'));
// { tracks: {...} }

client(search('pink venom', ['track', 'album']));
// {
//  tracks: {...},
//	albums: {...}
// }
```

#### searchString helper

The provided `searchString` function accepts an object and can easily create more advanced search queries to filter results

```js
import { searchString } from '@ekwoka/spotify-api/endpoints/search';

const query = searchString({
  q: 'pink venom', // string
  artist: 'blackpink', // string: filters for provided artist
  album: 'pink venom', // string: filters for provided album
  year: 2022, // number | string: filters for provided year
  genre: 'pop', // string: filters for provided genre
  tag: 'hipster', // 'hipster' | 'new': filters for low popularity or recent releases
});

const results = client(search(searchString(query, 'track')));
```

For more information on all the options here, check the [official Spotify docs for the Search endpoint](https://developer.spotify.com/documentation/web-api/reference/#/operations/search)

### Tracks

Current available endpoints within the Tracks category include:

- `trackIsSaved` - Gets whether a provided track id is in the user's library
- `saveTracks` - Put's tracks into the user's library
- `removeTracks` - Deletes tracks from the user's library

> These 3 all use batching to improve performance, and these 3 all also use a shared cache of in-Library states.

Cachekey: `saved.tracks[id]`
Batching Limit: 50

- `getRecommendations` - Gets recommendations based on provided seeds.

#### trackIsSaved

Gets whether the provided track IDs are present in the user's library. Works with single IDs or arrays of IDs.

```js
const isSaved = client(trackIsSaved('0skYUMpS0AcbpjcGsAbRGj')); // true | false
const areSaved = client(
  trackIsSaved(['0skYUMpS0AcbpjcGsAbRGj', '60jFaQV7Z4boGC4ob5B5c6'])
); // [true, false]
```

#### saveTracks

Puts track ID into the user's library. Returns `true` if successful. Works with single IDs or arrays of IDs.

```js
const isSaved = client(saveTracks('0skYUMpS0AcbpjcGsAbRGj')); // true
const wasSaved = client(
  saveTracks(['0skYUMpS0AcbpjcGsAbRGj', '60jFaQV7Z4boGC4ob5B5c6'])
); // [true, true]
```

#### removeTracks

Deletes track ID from the user's library. Returns `true` if successful. Works with single IDs or arrays of IDs.

```js
const isRemoved = client(removeTracks('0skYUMpS0AcbpjcGsAbRGj')); // true
const wasRemoved = client(
  removeTracks(['0skYUMpS0AcbpjcGsAbRGj', '60jFaQV7Z4boGC4ob5B5c6'])
); // [true, true]
```

#### getRecommendations

Get's recommendations based on provided seeds and musical properties.

```js
const recommended = client(
  getRecommendations({
    seed_artists: ['1VwDG9aBflQupaFNjUru9A', '4k5fFEYgkWYrYvtOK3zVBl'],
    seed_tracks: ['3T4s8KFP2SGW7hfmbcICsv', '2occELokWRfqLIlQJhJLZ6'],
  })
);
const recommended = client(
  getRecommendations({
    seed_artists: '1VwDG9aBflQupaFNjUru9A',
    target_danceability: 0.35,
  })
);
```

Seed count must be 1-5 spread between `seed_tracks`, `seed_artists`, and `seed_genres`. Providing no seeds, or more than 5 will throw an error at runtime.

Options:
Please refer to [Spotify's endpoint documentation](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations) for information on all the details of all the available tunable options for the recommendations api.

### Users

Currently Available methods in the Users category include:

- `getCurrentUser` - Retrieves data related to the actively logged in user (as defined by access token)
- `getTopItems` - Retrieves info covering the Users Top Tracks and Artists
- `getUserProfile` - Retrieves public info regarding another User by ID

#### getCurrentUser

Gets details of the currently logged in user (identified by token)

```js
const user = client(getCurrentUser());

console.log(user); // should log user
```

CacheKey: `user`

#### getTopItems

Gets the users top tracks or artists

```js
const topTracks = await client(
  getTopItems('tracks', { limit: 50, time_range: 'long_term' })
);
const topArtists = await client(
  getTopItems('artists', { offset: 20, limit: 10 })
);
```

Options:

- `limit`: The number of items to return. Default: `20`. Maximum: `50`.
- `offset`: The index of the first item to return. Default: `0`.
- `time_range`: Over what time frame the data is retrieved. Options: `short_term`, `medium_term`, `long_term`. Default: `medium_term`.

#### getUserProfile

Get's another user's profile by ID

```js
const thekwoka = await client(getUserProfile('thekwoka'));
```

## Batching, Caching, and Limit Breaking

One of the unique features of this API wrapper is the use of batched requests and intelligent caching. These features serve the purpose of reducing the number of requests make to the Spotify API and generally improving the responsiveness of your application.

All of these takes place under the hood, and the implementation of your code should be relatively agnostic to the fact this is happening.

### Batching

Many endpoints that exist with the Spotify API accept the request for multiple items at a single time. For example, even though a singular `album` endpoint exists, there is also an `albums` endpoint that returns the same information, but simply using an array of album IDs instead of a singular one.

So, the basic idea is that, if the application is making calls for many individual items ( like `album`), and those items can be batched (into `albums`), this wrapper will automatically do so and distribute the results.

Example:

```js
const ids = ['6tLZvqqoWszgPagzzNNQQF', '6XBIkDFhDgc3PQOUEcO2fd'];
ids.forEach(async (id) => {
  const album = await client(getAlbum(id));
  console.log(album.name);
});
```

While this is a bit contrived, in a component based framework, you might have these actual calls happening in places far away from each other.

In the background, these two ids will be bunched together (if they come in close enough to eachother) sent as a single request to Spotify, and resolved from the return. This also includes combining multiple requests for a single album into only the one reference requested from Spotify.

### Caching

As this data changes infrequently, responses will be cached and reused when the same information is requested again. This works with the above batching, as well. So if you make a bulk request for 10 albums, 3 of which you've already searched for before, those 3 will be returned from cache and the other 7 will be fetched anew, all without any adjustments to how your code behaves.

### Limit Breaking

Many endpoints offered by Spotify provide limits to how many items can be handled in one request. Retrieving items from a playlist is limited to 100, getting multiple albums in a single request is limited to 20, etc.

This api wrapper, in many places, dynamically breaks these limits.

For example, if you want to get all the songs in a playlist:

```js
const tracks = await client(getPlaylistItems('37i9dQZF1DX5g856aiKiDS'));
// only 100 items
```

This will retrieve up to 100 items from the playlist, and in other wrappers, or working with the API yourself, you'd need to then figure out next requests to send to get more items. This wrapper can allow larger limits (including `Infinity`!) and will make all the necessary requests in the background and return a clean list.

```js
const tracks = await client(
  getPlaylistItems('37i9dQZF1DX5g856aiKiDS', { limit: Infinity })
);
// every item in the playlist
```

In the background, this will check how many items are in the playlist, and make all the requests necessary to reconstruct the entire playlist.

The goal is to have every endpoint limit be broken like this.

#### Splitting Large Lists

This system also comes with another nice feature. Multiple item endpoints have limits on the total number of items in a single request. For the above example of `albums` it's 20.

Once again, in the background, as these requests come in, the total number of albums may be greater than 20. Or you may even do a direct request for more than 20 albums.

In the background, the request will be bunched into groups of 20, sent as requests, and, once again, distributed back to whence they came.

The goal is for this behavior to work on just about every endpoint you might want to access by an id.

## Special Utilities

### Cache Busting

As noted, a major benefit of this API wrapper is the intelligent use of caches. The current cache implementation is a [Weak LRU Cache](https://github.com/ekwoka/weak-lru-cache), allowing older unused data to gracefully be garbage collected naturally, while still being retrievable if still in use outside of the cache. However, caches may not always be accurate, or may introduce other issues in certain contexts. As such, there is a special utility for cache busting.

```js
import { resetCache } from '@ekwoka/spotify-api';

// clears entire cache
client(resetCache());

// clears specific cached value
client(resetCache('album.saved')); // should clear saved albums cache only
```

Where caches are utilized, the documentation for those endpoints will include information about the cache key(s) used.
