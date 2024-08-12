/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const until = async (conditionalFunction: Function, timeout = 5000) => {
  let timeoutId: NodeJS.Timeout | null = null;

  const poll = async (resolve: any) => {
    if (await conditionalFunction()) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      resolve();
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => poll(resolve), timeout);
    }
  };

  return new Promise(poll);
};
