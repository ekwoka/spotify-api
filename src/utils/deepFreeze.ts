export const deepFreeze = (obj: unknown) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && !Object.isFrozen(obj[key])) {
      deepFreeze(obj[key]);
    }
  });
  return Object.freeze(obj);
};
