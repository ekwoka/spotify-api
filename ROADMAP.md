# Roadmap & Progress

This document serves the purpose of documenting the progress of the API. This can be used as a source for determining helpful contributions (like tackling unimplemented endpoints).

## Utilities

### Authorization

- [x] Get Tokens from Code
- [x] Get token from refresh token
- [x] Build Auth Login URL

## Endpoints

### Albums

> NOTE: These two can be merged for convenience, or even only implement multi album. Will need to evaluate returned types to see what makes most sense

- [x] [GET Album](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-album) - `/albums/{id}`
- [x] [GET Several Albums](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-multiple-albums) - `/albums`
- [x] [GET Album Tracks](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-albums-tracks) - `/albums/{id}/tracks`
- [x] [GET Saved Albums](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-albums) - `/me/albums`

> NOTE: These two can likely be merged

- [x] [PUT Save Album](https://developer.spotify.com/documentation/web-api/reference/#/operations/save-albums-user) - `/me/albums`
- [x] [DELETE Remove Album](https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-albums-user) - `/me/albums`
- [x] [GET If User Saved Album](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-albums) - `/me/albums/contains`
- [x] [GET New Releases](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases) - `/browser/new-releases`

### Artists

- [ ] [GET Artist](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist) - `/artists/{id}`
- [ ] [GET Several Artists](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-artists) - `/artists`

### Player

- [x] [GET Recently Played Tracks](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recently-played) - `me/player/recently-played`

### Playlists

- [ ] [GET Playlist](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlist) - `/playlists/{id}`
- [ ] [GET Playlist Tracks](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-playlists-tracks) - `/playlists/{id}/tracks`
- [ ] [GET Current Users Saved Playlists](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-a-list-of-current-users-playlists) - `/me/playlists`

### Search

- [x] [GET Search for Item](https://developer.spotify.com/documentation/web-api/reference/#/operations/search) - `/search`

### User

- [x] [GET Current User Profile](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-current-users-profile) - `/me`
- [x] [GET User's Top Items](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-top-artists-and-tracks) - `/me/top/{type}`
- [x] [GET User Profile by ID](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-profile) - `/users/{user_id}`

> Note: These next two could be merged to a single wrapper endpoint

- [ ] [PUT Follow Playlist](https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-playlist) - `/playlists/{playlist_id}/followers`
- [ ] [DELETE Unfollow Playlist](https://developer.spotify.com/documentation/web-api/reference/#/operations/unfollow-playlist) - `/playlists/{playlist_id}/followers`
- [ ] [GET If User Follows Playlist](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-if-user-follows-playlist) - `/playlists/{playlist_id}/followers/contains`

- [ ] [GET Followed Artists](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-followed) - `/me/following`

> Note: Next Two can be merged

- [ ] [PUT Follow Artist or User](https://developer.spotify.com/documentation/web-api/reference/#/operations/follow-artists-users) - `/me/following`
- [ ] [DELETE Unfollow Artist or User](https://developer.spotify.com/documentation/web-api/reference/#/operations/unfollow-artists-users) - `/me/following`
- [ ] [GET If User Follows Artist or User](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-current-user-follows) - `/me/following/cotains`

### Tracks

- [x] [GET If User Saved Track](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-tracks) - `/me/tracks/contains`
- [x] [PUT Track into User's Saved](https://developer.spotify.com/documentation/web-api/reference/#/operations/save-tracks-user) - `/me/tracks`
- [x] [DELETE Track from User's Saved](https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-tracks-user) - `/me/tracks`

- [x] [GET recommendations](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-recommendations) - `/recommendations`
