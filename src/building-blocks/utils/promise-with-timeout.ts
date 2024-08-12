import ms from 'ms';

export function promiseWithTimeout<ResultType>(promise: Promise<ResultType>, timeoutPeriod = '30s') {
  const timeoutPromise = new Promise((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);

      reject(new Error('Oops! This operation take too long to complete.'));
    }, ms(timeoutPeriod));
  });

  return Promise.race([promise, timeoutPromise]) as Promise<ResultType>;
}
