# ⚡️A tree-shakable, composable, lightweight wrapper for the multiple Spotify APIs🔥

[<img src="https://badgen.net/npm/v/@ekwoka/spotify-api">](https://www.npmjs.com/package/@ekwoka/spotify-api)
<img src="https://badgen.net/npm/types/@ekwoka/spotify-api?icon=typescript">
<img src="https://badgen.net/npm/dt/@ekwoka/spotify-api" >

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

- `getTokenFromCode`: Accepts a code from the Spotify authentication flow and returns a suite of tokens (access and refresh).
- `refreshToken`: Accepts a refresh token and returns a new access token.

These currently depend on you setting up and exposing certain environment variables for the functions to access:

- `SPOTIFY_CLIENT`: Client id from Spotify Developer Dashboard.
- `SPOTIFY_SECRET`: Client secret.

If these are not defined, the function will throw.

### Examples (Pseudo Express code)

```js
import { getTokenFromCode, refreshToken } from '@ekwoka/spotify-api';

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

### Users

Currently Available methods in the Users category include:

- `getCurrentUser` - Retrieves data related to the actively logged in user (as defined by access token)

#### getCurrentUser

```js
const user = client(getCurrentUser());

console.log(user); // should log user
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
