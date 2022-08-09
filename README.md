# ⚡️A tree-shakable, composable, lightweight wrapper for the multiple Spotify APIs🔥

[<img src="https://img.shields.io/npm/v/@ekwoka/spotify-api?style=for-the-badge">](https://www.npmjs.com/package/@ekwoka/spotify-api)
<img src="https://img.shields.io/npm/types/@ekwoka/spotify-api?label=%20&amp;logo=typescript&amp;logoColor=white&amp;style=for-the-badge">
<img src="https://img.shields.io/npm/dt/@ekwoka/spotify-api?style=for-the-badge" >
[<img src="https://img.shields.io/bundlephobia/minzip/@ekwoka/spotify-api?style=for-the-badge">](https://bundlephobia.com/package/@ekwoka/spotify-api)

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

These currently depend on you setting up and exposing certain environment variables for the functions to access on the `process.env` object:

- `SPOTIFY_CLIENT`: Client id from Spotify Developer Dashboard.
- `SPOTIFY_SECRET`: Client secret.
- `REDIRECT`: URL to pass to Spotify Auth for handling the user returning to your app.

If these are not defined, the function will throw.

### Examples (Pseudo Express code)

```js
import { getTokenFromCode, refreshToken, makeAuthURL } from '@ekwoka/spotify-api';

const loginHandler = async(req, res) => {
	const url = makeAuthURL(['user-read-email'])
	res.redirect(302, url)
}

const codeHandler = async (req, res) => {
  try {
    const { code } = JSON.parse(req.body);
    const { access_token, refresh_token } = await getTokenFromCode(code);
    res.cookie('refresh_token', refresh_token);
    res.status(200).json({ access_token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refreshHandler = async (req, res) => {
  try {
    const { refresh_token } = req.cookies;
    const { access_token } = await refreshToken(refresh_token);
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

> While these correspond to 3 different endpoints to Spotify's API, internally these 3 use only the `getAlbums` endpoints for improved code-reuse as well as future batching and caching.

### getAlbum

Gets details of an Album by ID.

```js
const album = client(getAlbum('6tLZvqqoWszgPagzzNNQQF'))
const albumInMarket = client(getAlbum('6tLZvqqoWszgPagzzNNQQF', 'KR'))
```

#### getAlbums

Gets Details about multiple Albums at once.

```js
const albums = client(getAlbums(['6tLZvqqoWszgPagzzNNQQF','6XBIkDFhDgc3PQOUEcO2fd']))
const albumsInMarket = client(getAlbums(['6tLZvqqoWszgPagzzNNQQF','6XBIkDFhDgc3PQOUEcO2fd'], 'KR'))
```

#### getAlbumTracks

Gets Track Info about Album

```js
const album = client(getAlbumTracks('6tLZvqqoWszgPagzzNNQQF'))
const albumInMarket = client(getAlbumTracks('6tLZvqqoWszgPagzzNNQQF', 'KR'))
```


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

cache key: 'user'

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

## Special Utilities

### Cache Busting

As noted, a major benefit of this API wrapper is the intelligent use of caches. However, caches may not always be accurate, or may introduce other issues in certain contexts. As such, there is a special utility for cache busting.

```js
import { resetCache } from '@ekwoka/spotify-api';

// clears entire cache
client(resetCache());

// clears specific cached value
client(resetCache('user')); // should clear user cache only
```

Where caches are utilized, the documentation for those endpoints will include information about the cache key(s) used.
