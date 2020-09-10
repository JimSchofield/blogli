export const getFirstTruthy = (...args: any[]): any => {
  if (args.length === 0) {
    return false;
  }
  if (args[0]) {
    return args[0];
  }
  return getFirstTruthy(...args.slice(1));
};
