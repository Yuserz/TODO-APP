import tap from 'tap';
import { build } from '../../src/app.js';
import 'must/register.js';

tap.mochaGlobals();

describe('./api shoould work', async () => {
  let app;

  before(async () => {
    app = await build();
  });

  it('Should return {success: true}', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/api'
    });

    // this checks if HTTP status equals to 200
    response.statusCode.must.be.equal(200);

    const result = await response.json();

    // this checks if {success} = true
    result.success.must.be.true();
  });
});
