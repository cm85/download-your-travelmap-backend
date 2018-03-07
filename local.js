const fs = require('fs');

const payload = { queryStringParameters: { url: 'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller' } };
const app = require('./app/index');
const babelApp = require('./app/index');

const cb = (obj, res) => {
  console.log(JSON.parse(res.body).username); // eslint-disable-line
};

process.env.BUCKET = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_s3_bucket.bucket'].primary.id;

app.handler(payload, null, cb);
babelApp.handler(payload, null, cb);
