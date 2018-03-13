/* eslint-disable-file */
const payload = { queryStringParameters: { url: 'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller' } };
const app = require('./app/index');
const babelApp = require('./output/index');

const cb = (obj, res) => {
  console.log(JSON.parse(res.body).username);
};

process.env.BUCKET = 'bucket-download-your-travelmap-reloaded';

app.handler(payload, null, cb);
babelApp.handler(payload, null, cb);
