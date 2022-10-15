import { beforeAll, describe, expect, it } from 'vitest';
import { hasToken, makeMock } from '../../../testingTools';
import { currentlyPlayingTrack } from './';
import { PersistentApiProperties } from '../../core';

describe('currentlyPlayingTrack', () => {
  beforeAll(() => {
    makeMock('v1/me/player/currently-playing', {
      handler: (req) => {
        if (!hasToken(req.headers as unknown as string[]))
          return { statusCode: 401 };
        return {
          statusCode: 200,
          data: mockedCurrentlyPlaying,
        };
      },
    });
    makeMock('v1/me/player/currently-playing', {
      handler: () => ({ statusCode: 200, data: undefined }),
    });
  });
  it('should return a function', () => {
    expect(typeof currentlyPlayingTrack()).toBe('function');
  });
  it('should return a track', async () => {
    const results = await currentlyPlayingTrack()({
      token: 'token',
    } as PersistentApiProperties);
    expect(results.item).toBeDefined();
  });
  it('should return null if no track is playing', async () => {
    const result = await currentlyPlayingTrack()({
      token: 'token',
    } as PersistentApiProperties);
    expect(result).toBeNull();
  });
});

const mockedCurrentlyPlaying = {
  device: {
    id: 'string',
    is_active: true,
    is_private_session: true,
    is_restricted: true,
    name: 'Kitchen speaker',
    type: 'computer',
    volume_percent: 59,
  },
  repeat_state: 'string',
  shuffle_state: 'string',
  context: {
    type: 'string',
    href: 'string',
    external_urls: {
      spotify: 'string',
    },
    uri: 'string',
  },
  timestamp: 0,
  progress_ms: 0,
  is_playing: true,
  item: {
    album: {
      album_type: 'compilation',
      total_tracks: 9,
      available_markets: ['CA', 'BR', 'IT'],
      external_urls: {
        spotify: 'string',
      },
      href: 'string',
      id: '2up3OPMp9Tb4dAKM2erWXQ',
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
          height: 300,
          width: 300,
        },
      ],
      name: 'string',
      release_date: '1981-12',
      release_date_precision: 'year',
      restrictions: {
        reason: 'market',
      },
      type: 'album',
      uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
      album_group: 'compilation',
      artists: [
        {
          external_urls: {
            spotify: 'string',
          },
          href: 'string',
          id: 'string',
          name: 'string',
          type: 'artist',
          uri: 'string',
        },
      ],
    },
    artists: [
      {
        external_urls: {
          spotify: 'string',
        },
        followers: {
          href: 'string',
          total: 0,
        },
        genres: ['Prog rock', 'Grunge'],
        href: 'string',
        id: 'string',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
            height: 300,
            width: 300,
          },
        ],
        name: 'string',
        popularity: 0,
        type: 'artist',
        uri: 'string',
      },
    ],
    available_markets: ['string'],
    disc_number: 0,
    duration_ms: 0,
    explicit: true,
    external_ids: {
      isrc: 'string',
      ean: 'string',
      upc: 'string',
    },
    external_urls: {
      spotify: 'string',
    },
    href: 'string',
    id: 'string',
    is_playable: true,
    linked_from: {
      album: {
        album_type: 'compilation',
        total_tracks: 9,
        available_markets: ['CA', 'BR', 'IT'],
        external_urls: {
          spotify: 'string',
        },
        href: 'string',
        id: '2up3OPMp9Tb4dAKM2erWXQ',
        images: [
          {
            url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
            height: 300,
            width: 300,
          },
        ],
        name: 'string',
        release_date: '1981-12',
        release_date_precision: 'year',
        restrictions: {
          reason: 'market',
        },
        type: 'album',
        uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
        album_group: 'compilation',
        artists: [
          {
            external_urls: {
              spotify: 'string',
            },
            href: 'string',
            id: 'string',
            name: 'string',
            type: 'artist',
            uri: 'string',
          },
        ],
      },
      artists: [
        {
          external_urls: {
            spotify: 'string',
          },
          followers: {
            href: 'string',
            total: 0,
          },
          genres: ['Prog rock', 'Grunge'],
          href: 'string',
          id: 'string',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
              height: 300,
              width: 300,
            },
          ],
          name: 'string',
          popularity: 0,
          type: 'artist',
          uri: 'string',
        },
      ],
      available_markets: ['string'],
      disc_number: 0,
      duration_ms: 0,
      explicit: true,
      external_ids: {
        isrc: 'string',
        ean: 'string',
        upc: 'string',
      },
      external_urls: {
        spotify: 'string',
      },
      href: 'string',
      id: 'string',
      is_playable: true,
      linked_from: {
        album: {
          album_type: 'compilation',
          total_tracks: 9,
          available_markets: ['CA', 'BR', 'IT'],
          external_urls: {
            spotify: 'string',
          },
          href: 'string',
          id: '2up3OPMp9Tb4dAKM2erWXQ',
          images: [
            {
              url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
              height: 300,
              width: 300,
            },
          ],
          name: 'string',
          release_date: '1981-12',
          release_date_precision: 'year',
          restrictions: {
            reason: 'market',
          },
          type: 'album',
          uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
          album_group: 'compilation',
          artists: [
            {
              external_urls: {
                spotify: 'string',
              },
              href: 'string',
              id: 'string',
              name: 'string',
              type: 'artist',
              uri: 'string',
            },
          ],
        },
        artists: [
          {
            external_urls: {
              spotify: 'string',
            },
            followers: {
              href: 'string',
              total: 0,
            },
            genres: ['Prog rock', 'Grunge'],
            href: 'string',
            id: 'string',
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                height: 300,
                width: 300,
              },
            ],
            name: 'string',
            popularity: 0,
            type: 'artist',
            uri: 'string',
          },
        ],
        available_markets: ['string'],
        disc_number: 0,
        duration_ms: 0,
        explicit: true,
        external_ids: {
          isrc: 'string',
          ean: 'string',
          upc: 'string',
        },
        external_urls: {
          spotify: 'string',
        },
        href: 'string',
        id: 'string',
        is_playable: true,
        linked_from: {
          album: {
            album_type: 'compilation',
            total_tracks: 9,
            available_markets: ['CA', 'BR', 'IT'],
            external_urls: {
              spotify: 'string',
            },
            href: 'string',
            id: '2up3OPMp9Tb4dAKM2erWXQ',
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                height: 300,
                width: 300,
              },
            ],
            name: 'string',
            release_date: '1981-12',
            release_date_precision: 'year',
            restrictions: {
              reason: 'market',
            },
            type: 'album',
            uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
            album_group: 'compilation',
            artists: [
              {
                external_urls: {
                  spotify: 'string',
                },
                href: 'string',
                id: 'string',
                name: 'string',
                type: 'artist',
                uri: 'string',
              },
            ],
          },
          artists: [
            {
              external_urls: {
                spotify: 'string',
              },
              followers: {
                href: 'string',
                total: 0,
              },
              genres: ['Prog rock', 'Grunge'],
              href: 'string',
              id: 'string',
              images: [
                {
                  url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                  height: 300,
                  width: 300,
                },
              ],
              name: 'string',
              popularity: 0,
              type: 'artist',
              uri: 'string',
            },
          ],
          available_markets: ['string'],
          disc_number: 0,
          duration_ms: 0,
          explicit: true,
          external_ids: {
            isrc: 'string',
            ean: 'string',
            upc: 'string',
          },
          external_urls: {
            spotify: 'string',
          },
          href: 'string',
          id: 'string',
          is_playable: true,
          linked_from: {
            album: {
              album_type: 'compilation',
              total_tracks: 9,
              available_markets: ['CA', 'BR', 'IT'],
              external_urls: {
                spotify: 'string',
              },
              href: 'string',
              id: '2up3OPMp9Tb4dAKM2erWXQ',
              images: [
                {
                  url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                  height: 300,
                  width: 300,
                },
              ],
              name: 'string',
              release_date: '1981-12',
              release_date_precision: 'year',
              restrictions: {
                reason: 'market',
              },
              type: 'album',
              uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
              album_group: 'compilation',
              artists: [
                {
                  external_urls: {
                    spotify: 'string',
                  },
                  href: 'string',
                  id: 'string',
                  name: 'string',
                  type: 'artist',
                  uri: 'string',
                },
              ],
            },
            artists: [
              {
                external_urls: {
                  spotify: 'string',
                },
                followers: {
                  href: 'string',
                  total: 0,
                },
                genres: ['Prog rock', 'Grunge'],
                href: 'string',
                id: 'string',
                images: [
                  {
                    url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                    height: 300,
                    width: 300,
                  },
                ],
                name: 'string',
                popularity: 0,
                type: 'artist',
                uri: 'string',
              },
            ],
            available_markets: ['string'],
            disc_number: 0,
            duration_ms: 0,
            explicit: true,
            external_ids: {
              isrc: 'string',
              ean: 'string',
              upc: 'string',
            },
            external_urls: {
              spotify: 'string',
            },
            href: 'string',
            id: 'string',
            is_playable: true,
            linked_from: {
              album: {
                album_type: 'compilation',
                total_tracks: 9,
                available_markets: ['CA', 'BR', 'IT'],
                external_urls: {
                  spotify: 'string',
                },
                href: 'string',
                id: '2up3OPMp9Tb4dAKM2erWXQ',
                images: [
                  {
                    url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                    height: 300,
                    width: 300,
                  },
                ],
                name: 'string',
                release_date: '1981-12',
                release_date_precision: 'year',
                restrictions: {
                  reason: 'market',
                },
                type: 'album',
                uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
                album_group: 'compilation',
                artists: [
                  {
                    external_urls: {
                      spotify: 'string',
                    },
                    href: 'string',
                    id: 'string',
                    name: 'string',
                    type: 'artist',
                    uri: 'string',
                  },
                ],
              },
              artists: [
                {
                  external_urls: {
                    spotify: 'string',
                  },
                  followers: {
                    href: 'string',
                    total: 0,
                  },
                  genres: ['Prog rock', 'Grunge'],
                  href: 'string',
                  id: 'string',
                  images: [
                    {
                      url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                      height: 300,
                      width: 300,
                    },
                  ],
                  name: 'string',
                  popularity: 0,
                  type: 'artist',
                  uri: 'string',
                },
              ],
              available_markets: ['string'],
              disc_number: 0,
              duration_ms: 0,
              explicit: true,
              external_ids: {
                isrc: 'string',
                ean: 'string',
                upc: 'string',
              },
              external_urls: {
                spotify: 'string',
              },
              href: 'string',
              id: 'string',
              is_playable: true,
              linked_from: {
                album: {
                  album_type: 'compilation',
                  total_tracks: 9,
                  available_markets: ['CA', 'BR', 'IT'],
                  external_urls: {
                    spotify: 'string',
                  },
                  href: 'string',
                  id: '2up3OPMp9Tb4dAKM2erWXQ',
                  images: [
                    {
                      url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                      height: 300,
                      width: 300,
                    },
                  ],
                  name: 'string',
                  release_date: '1981-12',
                  release_date_precision: 'year',
                  restrictions: {
                    reason: 'market',
                  },
                  type: 'album',
                  uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
                  album_group: 'compilation',
                  artists: [
                    {
                      external_urls: {
                        spotify: 'string',
                      },
                      href: 'string',
                      id: 'string',
                      name: 'string',
                      type: 'artist',
                      uri: 'string',
                    },
                  ],
                },
                artists: [
                  {
                    external_urls: {
                      spotify: 'string',
                    },
                    followers: {
                      href: 'string',
                      total: 0,
                    },
                    genres: ['Prog rock', 'Grunge'],
                    href: 'string',
                    id: 'string',
                    images: [
                      {
                        url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                        height: 300,
                        width: 300,
                      },
                    ],
                    name: 'string',
                    popularity: 0,
                    type: 'artist',
                    uri: 'string',
                  },
                ],
                available_markets: ['string'],
                disc_number: 0,
                duration_ms: 0,
                explicit: true,
                external_ids: {
                  isrc: 'string',
                  ean: 'string',
                  upc: 'string',
                },
                external_urls: {
                  spotify: 'string',
                },
                href: 'string',
                id: 'string',
                is_playable: true,
                linked_from: {
                  album: {
                    album_type: 'compilation',
                    total_tracks: 9,
                    available_markets: ['CA', 'BR', 'IT'],
                    external_urls: {
                      spotify: 'string',
                    },
                    href: 'string',
                    id: '2up3OPMp9Tb4dAKM2erWXQ',
                    images: [
                      {
                        url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                        height: 300,
                        width: 300,
                      },
                    ],
                    name: 'string',
                    release_date: '1981-12',
                    release_date_precision: 'year',
                    restrictions: {
                      reason: 'market',
                    },
                    type: 'album',
                    uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
                    album_group: 'compilation',
                    artists: [
                      {
                        external_urls: {
                          spotify: 'string',
                        },
                        href: 'string',
                        id: 'string',
                        name: 'string',
                        type: 'artist',
                        uri: 'string',
                      },
                    ],
                  },
                  artists: [
                    {
                      external_urls: {
                        spotify: 'string',
                      },
                      followers: {
                        href: 'string',
                        total: 0,
                      },
                      genres: ['Prog rock', 'Grunge'],
                      href: 'string',
                      id: 'string',
                      images: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                          height: 300,
                          width: 300,
                        },
                      ],
                      name: 'string',
                      popularity: 0,
                      type: 'artist',
                      uri: 'string',
                    },
                  ],
                  available_markets: ['string'],
                  disc_number: 0,
                  duration_ms: 0,
                  explicit: true,
                  external_ids: {
                    isrc: 'string',
                    ean: 'string',
                    upc: 'string',
                  },
                  external_urls: {
                    spotify: 'string',
                  },
                  href: 'string',
                  id: 'string',
                  is_playable: true,
                  linked_from: {
                    album: {
                      album_type: 'compilation',
                      total_tracks: 9,
                      available_markets: ['CA', 'BR', 'IT'],
                      external_urls: {
                        spotify: 'string',
                      },
                      href: 'string',
                      id: '2up3OPMp9Tb4dAKM2erWXQ',
                      images: [
                        {
                          url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                          height: 300,
                          width: 300,
                        },
                      ],
                      name: 'string',
                      release_date: '1981-12',
                      release_date_precision: 'year',
                      restrictions: {
                        reason: 'market',
                      },
                      type: 'album',
                      uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
                      album_group: 'compilation',
                      artists: [
                        {
                          external_urls: {
                            spotify: 'string',
                          },
                          href: 'string',
                          id: 'string',
                          name: 'string',
                          type: 'artist',
                          uri: 'string',
                        },
                      ],
                    },
                    artists: [
                      {
                        external_urls: {
                          spotify: 'string',
                        },
                        followers: {
                          href: 'string',
                          total: 0,
                        },
                        genres: ['Prog rock', 'Grunge'],
                        href: 'string',
                        id: 'string',
                        images: [
                          {
                            url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                            height: 300,
                            width: 300,
                          },
                        ],
                        name: 'string',
                        popularity: 0,
                        type: 'artist',
                        uri: 'string',
                      },
                    ],
                    available_markets: ['string'],
                    disc_number: 0,
                    duration_ms: 0,
                    explicit: true,
                    external_ids: {
                      isrc: 'string',
                      ean: 'string',
                      upc: 'string',
                    },
                    external_urls: {
                      spotify: 'string',
                    },
                    href: 'string',
                    id: 'string',
                    is_playable: true,
                    linked_from: {
                      album: {
                        album_type: 'compilation',
                        total_tracks: 9,
                        available_markets: ['CA', 'BR', 'IT'],
                        external_urls: {
                          spotify: 'string',
                        },
                        href: 'string',
                        id: '2up3OPMp9Tb4dAKM2erWXQ',
                        images: [
                          {
                            url: 'https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228\n',
                            height: 300,
                            width: 300,
                          },
                        ],
                        name: 'string',
                        release_date: '1981-12',
                        release_date_precision: 'year',
                        restrictions: {
                          reason: 'market',
                        },
                        type: 'album',
                        uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
                        album_group: 'compilation',
                        artists: [
                          {
                            external_urls: {},
                            href: 'string',
                            id: 'string',
                            name: 'string',
                            type: 'artist',
                            uri: 'string',
                          },
                        ],
                      },
                      artists: [
                        {
                          external_urls: {
                            spotify: 'string',
                          },
                          followers: {
                            href: 'string',
                            total: 0,
                          },
                          genres: ['Prog rock', 'Grunge'],
                          href: 'string',
                          id: 'string',
                          images: [{}],
                          name: 'string',
                          popularity: 0,
                          type: 'artist',
                          uri: 'string',
                        },
                      ],
                      available_markets: ['string'],
                      disc_number: 0,
                      duration_ms: 0,
                      explicit: true,
                      external_ids: {
                        isrc: 'string',
                        ean: 'string',
                        upc: 'string',
                      },
                      external_urls: {
                        spotify: 'string',
                      },
                      href: 'string',
                      id: 'string',
                      is_playable: true,
                      linked_from: {
                        album: {
                          album_type: 'compilation',
                          total_tracks: 9,
                          available_markets: ['CA', 'BR', 'IT'],
                          external_urls: {
                            spotify: 'string',
                          },
                          href: 'string',
                          id: '2up3OPMp9Tb4dAKM2erWXQ',
                          images: [{}],
                          name: 'string',
                          release_date: '1981-12',
                          release_date_precision: 'year',
                          restrictions: {
                            reason: 'market',
                          },
                          type: 'album',
                          uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
                          album_group: 'compilation',
                          artists: [{}],
                        },
                        artists: [
                          {
                            external_urls: {},
                            followers: {},
                            genres: ['Prog rock', 'Grunge'],
                            href: 'string',
                            id: 'string',
                            images: [{}],
                            name: 'string',
                            popularity: 0,
                            type: 'artist',
                            uri: 'string',
                          },
                        ],
                        available_markets: ['string'],
                        disc_number: 0,
                        duration_ms: 0,
                        explicit: true,
                        external_ids: {
                          isrc: 'string',
                          ean: 'string',
                          upc: 'string',
                        },
                        external_urls: {
                          spotify: 'string',
                        },
                        href: 'string',
                        id: 'string',
                        is_playable: true,
                        linked_from: {
                          album: {
                            album_type: 'compilation',
                            total_tracks: 9,
                            available_markets: ['CA', 'BR', 'IT'],
                            external_urls: {},
                            href: 'string',
                            id: '2up3OPMp9Tb4dAKM2erWXQ',
                            images: [{}],
                            name: 'string',
                            release_date: '1981-12',
                            release_date_precision: 'year',
                            restrictions: {},
                            type: 'album',
                            uri: 'spotify:album:2up3OPMp9Tb4dAKM2erWXQ',
                            album_group: 'compilation',
                            artists: [{}],
                          },
                          artists: [
                            {
                              genres: [],
                              images: [],
                            },
                          ],
                          available_markets: ['string'],
                          disc_number: 0,
                          duration_ms: 0,
                          explicit: true,
                          external_ids: {
                            isrc: 'string',
                            ean: 'string',
                            upc: 'string',
                          },
                          external_urls: {
                            spotify: 'string',
                          },
                          href: 'string',
                          id: 'string',
                          is_playable: true,
                          linked_from: {
                            album: {
                              available_markets: [],
                              images: [],
                              artists: [],
                            },
                            artists: [{}],
                            available_markets: [null],
                            disc_number: 0,
                            duration_ms: 0,
                            explicit: true,
                            external_ids: {},
                            external_urls: {},
                            href: 'string',
                            id: 'string',
                            is_playable: true,
                            linked_from: {
                              artists: [],
                              available_markets: [],
                            },
                            restrictions: {},
                            name: 'string',
                            popularity: 0,
                            preview_url: 'string',
                            track_number: 0,
                            type: 'string',
                            uri: 'string',
                            is_local: true,
                          },
                          restrictions: {
                            reason: 'string',
                          },
                          name: 'string',
                          popularity: 0,
                          preview_url: 'string',
                          track_number: 0,
                          type: 'string',
                          uri: 'string',
                          is_local: true,
                        },
                        restrictions: {
                          reason: 'string',
                        },
                        name: 'string',
                        popularity: 0,
                        preview_url: 'string',
                        track_number: 0,
                        type: 'string',
                        uri: 'string',
                        is_local: true,
                      },
                      restrictions: {
                        reason: 'string',
                      },
                      name: 'string',
                      popularity: 0,
                      preview_url: 'string',
                      track_number: 0,
                      type: 'string',
                      uri: 'string',
                      is_local: true,
                    },
                    restrictions: {
                      reason: 'string',
                    },
                    name: 'string',
                    popularity: 0,
                    preview_url: 'string',
                    track_number: 0,
                    type: 'string',
                    uri: 'string',
                    is_local: true,
                  },
                  restrictions: {
                    reason: 'string',
                  },
                  name: 'string',
                  popularity: 0,
                  preview_url: 'string',
                  track_number: 0,
                  type: 'string',
                  uri: 'string',
                  is_local: true,
                },
                restrictions: {
                  reason: 'string',
                },
                name: 'string',
                popularity: 0,
                preview_url: 'string',
                track_number: 0,
                type: 'string',
                uri: 'string',
                is_local: true,
              },
              restrictions: {
                reason: 'string',
              },
              name: 'string',
              popularity: 0,
              preview_url: 'string',
              track_number: 0,
              type: 'string',
              uri: 'string',
              is_local: true,
            },
            restrictions: {
              reason: 'string',
            },
            name: 'string',
            popularity: 0,
            preview_url: 'string',
            track_number: 0,
            type: 'string',
            uri: 'string',
            is_local: true,
          },
          restrictions: {
            reason: 'string',
          },
          name: 'string',
          popularity: 0,
          preview_url: 'string',
          track_number: 0,
          type: 'string',
          uri: 'string',
          is_local: true,
        },
        restrictions: {
          reason: 'string',
        },
        name: 'string',
        popularity: 0,
        preview_url: 'string',
        track_number: 0,
        type: 'string',
        uri: 'string',
        is_local: true,
      },
      restrictions: {
        reason: 'string',
      },
      name: 'string',
      popularity: 0,
      preview_url: 'string',
      track_number: 0,
      type: 'string',
      uri: 'string',
      is_local: true,
    },
    restrictions: {
      reason: 'string',
    },
    name: 'string',
    popularity: 0,
    preview_url: 'string',
    track_number: 0,
    type: 'string',
    uri: 'string',
    is_local: true,
  },
  currently_playing_type: 'string',
  actions: {
    interrupting_playback: true,
    pausing: true,
    resuming: true,
    seeking: true,
    skipping_next: true,
    skipping_prev: true,
    toggling_repeat_context: true,
    toggling_shuffle: true,
    toggling_repeat_track: true,
    transferring_playback: true,
  },
};
