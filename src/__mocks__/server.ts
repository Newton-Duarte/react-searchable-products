import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export async function enableMSW() {
  if (import.meta.env.MODE !== 'test') {
    return;
  }

  await worker.start();
}
