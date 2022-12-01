import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = './api';

describe('creating todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return {success: true}', async () => {
    const newTodo = {
      title: 'New Todo',
      description: 'Some description'
    };

    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    // this checks if HTTP status equals to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.not.be.null();
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    // expect taht isDone is false because it was not given
    result.isDone.must.be.false();
    // expect createdDate and updateDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
  it('Should return the object that was created with ID with isDone = to the given object', async () => {
    const newTodo = {
      title: 'New Todo 2',
      description: 'Some description 2',
      isDone: true
    };

    const response = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    // this checks if HTTP status equals to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.id.must.not.be.null();
    // expect that all of the values should be equal to newTodo properties
    result.title.must.be.equal(newTodo.title);
    result.description.must.be.equal(newTodo.description);
    result.isDone.must.be.equal(newTodo.isDone);
    // expect createdDate and updateDate is not null
    result.createdDate.must.not.be.null();
    result.updatedDate.must.not.be.null();
  });
});
