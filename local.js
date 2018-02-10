const fs = require('fs');

process.env.BUCKET = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_s3_bucket.bucket'].primary.id;

require('./app/index').handler({ queryStringParameters: { url: 'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller' } }, null, (obj, res) => {
   console.log(JSON.parse(res.body).username); // eslint-disable-line
});
