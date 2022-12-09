import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

const prefix = './api';

describe('get a todo should work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return the object given an ID', async () => {
    const newTodo = {
      title: 'New Todo for get',
      description: 'Some description'
    };

    const createResponse = await app.inject({
      method: 'POST',
      url: `${prefix}/todo`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    });

    const { id } = await createResponse.json();

    const response = await app.inject({
      method: 'DELETE',
      url: `${prefix}/todo/${id}`
    });

    // this checks if HTTP status equals to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // expect that id exists
    result.success.must.be.true();
  });
});
