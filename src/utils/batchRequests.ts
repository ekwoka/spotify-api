import { chunkArray, debounce } from './';

export const batchWrap = <T extends string, S>(
  cb: BatchCallback<T, S>,
  max = 20
): ((tkn: string, id: string) => Promise<S>) => {
  let batch: BatchQueue<S> = {};
  const addToBatch = (item: T, res: ResolveBatch<S>) => {
    if (!batch[item]) batch[item] = [];
    batch[item].push(res);
  };
  const performRequests = debounce((token: string) => {
    performBatchedRequest(token, batch, cb, max);
    batch = {};
  }, 50);

  return (token: string, id: T): Promise<S> => {
    return new Promise((res, rej) => {
      addToBatch(id, resOrRej(res, rej));
      performRequests(token);
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
  max: number
) => {
  const batches = chunkArray(Object.keys(batchQueue), max) as T[][];
  batches.forEach(async (batch) => {
    try {
      const dataToReturn = await cb(token, batch);
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

type BatchCallback<T extends string, S> = (
  token: string,
  data: T[]
) => Promise<S[]>;

type BatchQueue<S> = {
  [key: string]: ResolveBatch<S>[];
};

type ResolveBatch<S> = (res: S) => void;
