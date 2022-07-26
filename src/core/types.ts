export interface PersistentApiProperties {
  token: string;
}

export type SpotifyApiClient = <T>(fn: QueryFunction<T>) => T;
export type QueryFunction<T> = (props: PersistentApiProperties) => T;
export type QueryConstructor<Args = undefined, Return = void> = (
  args: Args
) => QueryFunction<Return>;
export type QueryConstructorWithOptionalArgs<
  Args = undefined,
  Return = void
> = (args?: Args) => QueryFunction<Return>;

export interface ApiCache {
  user?: User;
}

export interface User {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: true;
    filter_locked: true;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: [
    {
      url: string;
      height: number;
      width: number;
    }
  ];
  product: string;
  type: string;
  uri: string;
}
