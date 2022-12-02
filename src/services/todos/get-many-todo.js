import { getDB } from '../../utils/db/index.js';

export const getManyTodo = async (request, reply) => {
  const { query } = request;
  const { limit = 5 } = query;
  const db = await getDB();

  const list = [];

  const todos1 = Object
    .entries(db.todos);

  const todos2 = todos1.map(function ([id, todo]) {
    return {
      id,
      ...todo
    };
  });

  for(const{ title, createdDate } of todos2) {
    console.log('unsorted', title, new Date(createdDate))
  }

  todos2.sort(function (todo1, todo2) {
    return todo2.createdDate - todo1.createdDate;
  });

  for(const{ title, createdDate } of todos2) {
    console.log('sorted', title, new Date(createdDate))
  }

  for (const todo of todos2) {
    list.push(todo);
    if (list.length >= limit) {
      break;
    }
  }

  return list;
};
