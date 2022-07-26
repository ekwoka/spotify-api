import { isNode } from './isBrowserOrNode';

export const toBase64 = (str: string) => {
  if (isNode()) return Buffer.from(str).toString('base64');
  return btoa(str);
};
