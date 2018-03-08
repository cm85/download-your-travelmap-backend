const fs = require('fs');

const gatewayHost = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_api_gateway_deployment.deployment'].primary.attributes.invoke_url;

const aRecordHost = `https://${JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_api_gateway_domain_name.api'].primary.attributes.domain_name}`;


const query = '?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller';

require('isomorphic-fetch')(gatewayHost + query)
  .then(async (res) => {
    console.log(`${res.status}: ${res.url}`); /* eslint-disable-line no-console */
    // console.log(res.headers.raw());
    // console.log(await res.text());
  });


require('isomorphic-fetch')(aRecordHost + query)
  .then(async (res) => {
    console.log(`${res.status}: ${res.url}`); /* eslint-disable-line no-console */
    // console.log(res.headers.raw());
    // console.log(await res.text());
  }).catch(console.log); /* eslint-disable-line no-console */

// window.fetch('https://api-dytm2018.christianhaller.com/free-my-map?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller').then(async(res)=>{console.log(await res.text())});
