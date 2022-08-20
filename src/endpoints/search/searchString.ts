export const searchString = (options: queryObject): string =>
  Object.entries(options)
    .map(([key, value]) => (key === 'q' ? value : `${key}:${value}`))
    .join(' ');

type queryObject = {
  q: string;
  artist?: string;
  album?: string;
  year?: number | string;
  genre?: string;
  upc?: number | string;
  isrc?: number | string;
  tag?: 'hipster' | 'new';
  not?: string;
};
