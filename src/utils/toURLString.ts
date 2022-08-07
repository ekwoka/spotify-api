export const toURLString = (params: Record<string, string | number>): string =>
  new URLSearchParams(params as Record<string, string>).toString();
