import { afterAll, beforeAll } from 'vitest';
import { mockAgent } from './mockAgent';

//  Close server after all tests
beforeAll(() => {
  const warningListeners = process.listeners('warning');

  if (warningListeners.length != 1) {
    console.warn(
      `expected 1 listener on the process "warning" event, saw ${warningListeners.length}`
    );
  }

  if (warningListeners[0]) {
    const originalWarningListener = warningListeners[0];
    process.removeAllListeners('warning');

    process.prependListener('warning', (warning) => {
      if (warning.name != 'ExperimentalWarning') {
        originalWarningListener(warning);
      }
    });
  }
});
afterAll(async () => await mockAgent.close());
