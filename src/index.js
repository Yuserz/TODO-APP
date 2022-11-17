import { build } from './app.js';

async function start () {
  try {
    // if something goes wrong here, it will do the catch part
    const fastify = await build();

    const addr = await fastify.listen({
      port: '8080'
    });

    console.log(`Listening in port ${addr}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();
