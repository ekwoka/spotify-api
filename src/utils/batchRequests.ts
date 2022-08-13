import { chunkArray, debounce } from './';

/**
 * This is the core system for batching requests to Spotify's API. This piece
 * is used in the creation of batched endpoints and returns a function to
 * be called when wanting to add a new request to the batched queue.
 * @param cb string[] => any[]
 * @param max number
 * @returns BatchedFunction
 */
export const batchWrap = <T extends string, S>(
  cb: BatchCallback<T, S>,
  max = 20
): BatchedFunction<S> => {
  let batch: BatchQueue<S> = {};
  const addToBatch = (item: T, res: ResolveBatch<S>) => {
    if (!batch[item]) batch[item] = [];
    batch[item].push(res);
  };
  const performRequests = debounce((token: string, ...rest: unknown[]) => {
    performBatchedRequest(token, batch, cb, max, ...rest);
    batch = {};
  }, 50);

  return (token: string, id: T, ...rest: unknown[]): Promise<S> => {
    return new Promise((res, rej) => {
      addToBatch(id, resOrRej(res, rej));
      performRequests(token, ...rest);
    });
  };
};

const resOrRej = <T>(res: (val: T) => void, rej: (err: Error) => void) => {
  return (val: T | Error) => {
    if (val instanceof Error) rej(val);
    else res(val);
  };
};

const performBatchedRequest = <T extends string, S>(
  token: string,
  batchQueue: BatchQueue<S>,
  cb: BatchCallback<T, S>,
  max: number,
  ...rest: unknown[]
) => {
  const batches = chunkArray(Object.keys(batchQueue), max) as T[][];
  batches.forEach(async (batch) => {
    try {
      const dataToReturn = await cb(token, batch, ...rest);
      while (batch.length) {
        const resolves = batchQueue[batch.pop()];
        const nextData = dataToReturn.pop();
        resolves.forEach((res) => res(nextData));
      }
    } catch (e) {
      while (batch.length) {
        const resolves = batchQueue[batch.pop()];
        resolves.forEach((res) => res(e));
      }
    }
  });
};

export type BatchedFunction<S> = (
  tkn: string,
  id: string,
  ...rest: unknown[]
) => Promise<S>;

type BatchCallback<T extends string, S> = (
  token: string,
  data: T[],
  ...rest: unknown[]
) => Promise<S[]>;

type BatchQueue<S> = {
  [key: string]: ResolveBatch<S>[];
};

type ResolveBatch<S> = (res: S) => void;
