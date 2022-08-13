export const debounce = <F extends (...args: unknown[]) => void>(
  func: F,
  wait = 400
): F => {
  let timeout: string | number | NodeJS.Timeout;
  return ((...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as F;
};
