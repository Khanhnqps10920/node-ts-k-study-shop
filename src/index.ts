import 'dotenv/config';
import { App } from './bootstrap/App';

const main = async (): Promise<void> => {
  try {
    const server = new App();
    await server.start();
  } catch (e) {
    console.log('ERROR:::', e);
    throw e;
  }
};

main();
