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
import { SpotifyApi } from '@ekwoka/spotify-api'

export const client = SpotifyApi() // optionally pass in the users access token string
```

This will create the core client structure with which you'll manage and run requests to the Spotify Apis.

If a token is not set (and is required for a request) the client will throw an error.

To set a token after initialization (or update during ongoing usage) simply import and use the `setToken` composable with your client.

```js
import { SpotifyApi, setToken } from '@ekwoka/spotify-api'

const client = SpotifyApi() // no token

client(setToken('my_new_token')) // adds new token
```

As you'll notice, this is not a method on the client object like many other libraries. This is a composable function. The goal is for all interactions with the client and APIs to be composable functions. This will enable very aggressive tree-shaking to keep minimal clients from shipping lots of unused code, as well as enable code-splitting for larger applications.

## Endpoints

Endpoints are importable both from `@ekwoka/spotify-api` or `@ekwoka/spotify-api/endpoints` for convenience.

> NOTE: The following documentation uses the same structure as the Official Spotify Docs for organization

### Users

Currently Available methods in the Users category include:

- `getCurrentUser` - Retrieves data related to the actively logged in user (as defined by access token)

#### getCurrentUser

```js
const user = client(getCurrentUser())

console.log(user) // should log user
```