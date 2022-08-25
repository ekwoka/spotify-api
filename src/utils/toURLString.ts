import { maybeArray } from './types';

export const toURLString = (
  params: Record<string, maybeArray<string | number | boolean>>
): string => new URLSearchParams(params as Record<string, string>).toString();
