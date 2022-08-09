export const hasToken = (headers: string[]): boolean => {
  const authIndex = headers.findIndex((header) => header === 'authorization');
  return headers[authIndex + 1].includes('Bearer');
};
