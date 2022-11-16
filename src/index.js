import Fastify from 'fastify';

async function start () {
  try {
    // if something goes wrong here, it will do the catch part
    // Require the framework and instantiate it
    const fastify = Fastify({ logger: true });

    // Declare a route
    fastify.get('/api', async (request, reply) => {
      return { success: true };
    });

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
