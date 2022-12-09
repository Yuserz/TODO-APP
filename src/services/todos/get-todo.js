import { getDB } from '../../utils/db/index.js';

export const getTodo = async (request, reply) => {
  const { params } = request;
  const { todoId: id } = params;
  const db = await getDB();

  const { todos } = db;

  /* c8 ignore start */
  if (!todos[id]) {
    return {
      error: 'not found'
    };
  }
  /* c8 ignore end */

  return {
    id,
    ...todos[id]
  };
};
