const getMapData = require('../app/getMapData');


test('happy path', async () => {
  const result = await getMapData('https://www.tripadvisor.com/members/christianhaller');

  expect(result.username).toContain('christianhaller');
});

