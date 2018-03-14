const AWS = require('aws-sdk-mock');

process.env.BUCKET = require('../infrastructure/variables.tf.json').variable[1].bucket.default;

let app;

beforeEach(() => {
  AWS.mock('S3', 'putObject');
  app = require('../app/index'); /* eslint-disable-line global-require */
});


// const app = require('../dist/app');

const cb = (nth, data) => ({
  body: JSON.parse(data.body),
  status: data.statusCode,
});

test('follows redirect', async () => {
  const result = await app.handler(
    { queryStringParameters: { url: 'http://www.tripadvisor.co.uk/MemberProfile-a_uid.F3B46B68117496775EE93A2AB6A9C1DC' } }, null,
    cb,
  );

  expect(result.body.username).toMatch('Atanas_GK');
});

test('test trim', async () => {
  const result = await app.handler(
    { queryStringParameters: { url: ' http://www.tripadvisor.com/members/christianhaller' } }, null,
    cb,
  );

  expect(result.body.username).toMatch('christianhaller');
});

test('map url', async () => {
  const result = await app.handler({ queryStringParameters: { url: 'https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693' } }, null, cb);

  expect(result.body.username).toMatch('christianhaller');
});

test('no profile url', async () => {
  const result = await app.handler({ queryStringParameters: { url: 'http://www.tripadvisor.co.uk' } }, null, cb);

  expect(result).toMatchSnapshot();
});

test('no tripadvisor  url', async () => {
  const result = await app.handler({ queryStringParameters: { url: 'http://christianhaller.com' } }, null, cb);

  expect(result).toMatchSnapshot();
});

test('no profile url', async () => {
  const result = await app.handler(
    { queryStringParameters: { url: 'https://www.tripadvisor.com.br/Saves?v=list#39842494' } }, null,
    cb,
  );

  expect(result).toMatchSnapshot();
});

test('no url', async () => {
  const result = await app.handler({ queryStringParameters: { url: 'x' } }, null, cb);

  expect(result).toMatchSnapshot();
});
