import Fastify from 'fastify';

export async function build () {
  // Require the framework and instantiate it
  const fastify = Fastify({ logger: true });

  // Declare a route
  fastify.get('/api', async (request, reply) => {
    return { success: true };
  });
  return fastify;
}
