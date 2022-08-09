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
- [ ] [GET Album Tracks](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-albums-tracks) - `/albums/{id}/tracks`
- [ ] [GET Saved Albums](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-users-saved-albums) - `/me/albums`

> NOTE: These two can likely be merged

- [ ] [PUT Save Album](https://developer.spotify.com/documentation/web-api/reference/#/operations/save-albums-user) - `/me/albums`
- [ ] [DELETE Remove Album](https://developer.spotify.com/documentation/web-api/reference/#/operations/remove-albums-user) - `/me/albums`
- [ ] [GET If User Saved Album](https://developer.spotify.com/documentation/web-api/reference/#/operations/check-users-saved-albums) - `/me/albums/contains`
- [ ] [GET New Releases](https://developer.spotify.com/documentation/web-api/reference/#/operations/get-new-releases) - `/browser/new-releases`

### Search

- [ ] [GET Search for Item](https://developer.spotify.com/documentation/web-api/reference/#/operations/search) - `/search`

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
