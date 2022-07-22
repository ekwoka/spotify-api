export const client = (tkn?: string): ClientFunction => {
  const token: Token = {
    current: tkn ?? '',
  };

  return <T>(fn: QueryFunction<T>): T => {
    if (!token.current) throw new Error('Token has not yet been provided');
    return fn(token);
  };
};

export type Token = {
  current: string;
};

type ClientFunction = <T>(fn: QueryFunction<T>) => T;

export type QueryFunction<T> = (token: Token) => T;

export type QueryConstructor<T> = (...args: any) => QueryFunction<T>;
