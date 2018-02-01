const app = require('../app/index');

test('follows redirect', async () => {
  const result = await app.handler({ queryStringParameters: { url: 'http://www.tripadvisor.co.uk/MemberProfile-a_uid.F3B46B68117496775EE93A2AB6A9C1DC' } }, null, null);
  expect(result.username).toMatch('Atanas_GK');
});

test('test trim', async () => {
  const result = await app.handler({ queryStringParameters: { url: ' http://www.tripadvisor.com/members/christianhaller' } }, null, null);
  expect(result.username).toMatch('christianhaller');
});


test('map url', async () => {
  const result = await app.handler({ queryStringParameters: { url: 'https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693' } }, null, null);
  expect(result.username).toMatch('christianhaller');
});

test('no profile url', async () => {
  try {
    await app.handler({ queryStringParameters: { url: 'http://www.tripadvisor.co.uk' } }, null, null);
  } catch (e) {
    expect(e).toEqual({
      error: 'URL invalid',
    });
  }
});

test('no profile url', async () => {
  try {
    await app.handler({ queryStringParameters: { url: 'http://christianhaller.com' } }, null, null);
  } catch (e) {
    expect(e).toEqual({
      error: 'URL invalid',
    });
  }
});
