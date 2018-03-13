/* eslint-disable no-console */


const query = '?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller';
let url = gatewayHost + query;

require('isomorphic-fetch')(url)
  .then(async (res) => {
    console.log(`${res.status}: ${res.url}`);
    // console.log(res.headers.raw());
    // console.log(await res.text());
  });

url = aRecordHost + query;
console.log(url);
require('isomorphic-fetch')(url)
  .then(async (res) => {
    console.log(`${res.status}: ${res.url}`);
    // console.log(res.headers.raw());
    // console.log(await res.text());
    fs.writeFileSync('./dist/s3/local.json', await res.text());
  }).catch(console.log);
