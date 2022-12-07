import Fastify from 'fastify';
import { general } from './services/generals/index.js';
import { createTodo } from './services/todos/create-todo.js';
import { getManyTodo } from './services/todos/get-many-todo.js';
import { getTodo } from './services/todos/get-todo.js';

const prefix = '/api';

export async function build () {
  // Require the framework and instantiate it
  const fastify = Fastify({ logger: true });

  // Declare a route
  fastify.get(prefix, general);

  // create todo
  fastify.post(`${prefix}/todo`, createTodo);

  // get many todo
  fastify.get(`${prefix}/todo`, getManyTodo);

  // get one todo
  fastify.get(`${prefix}/todo/:todoId`, getTodo);

  return fastify;
}
