import { afterAll } from 'vitest';
import { mockAgent } from './mockAgent';

//  Close server after all tests
afterAll(async () => await mockAgent.close());
