export const deepFreeze = (obj: any) => {
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === 'object' && !Object.isFrozen(obj[key])) {
      deepFreeze(obj[key]);
    }
  });
  return Object.freeze(obj);
};
