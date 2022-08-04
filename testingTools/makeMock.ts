import { MockInterceptor } from 'undici/types/mock-interceptor';
import { mockPool } from './mockAgent';

export const makeMock: MakeMock = (endpoint, options) => {
  const method = options.method ?? 'GET';
  const statusCode = options.statusCode ?? 200;
  mockPool
    .intercept({
      path: endpoint,
      method,
    })
    .reply(
      options.handler ??
        (() => ({
          data: options.data ?? {},
          statusCode,
        }))
    )
    .persist();
};

type MakeMock = (endpoint: string, options: MockOptions) => void;

type MockOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  statusCode?: 200 | 401 | 403 | 404 | 429;
  data?: Record<string, unknown>;
  handler?: MockInterceptor.MockReplyOptionsCallback;
};
