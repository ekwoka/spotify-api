import { isNode } from './isBrowserOrNode';

/**
 * @param str string
 * @returns base64 string
 */
export const toBase64 = (str: string) => {
  if (isNode()) return Buffer.from(str).toString('base64');
  return btoa(str);
};
