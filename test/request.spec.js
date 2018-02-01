const request = require('../app/request');


test('creates csv', async () => {
  const result = await request('http://www.tripadvisor.com/members/christianhaller');

  expect(result.body).toMatch(/html/);
});

