const fs = require('fs');

const gatewayHost = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_api_gateway_deployment.MyDemoDeployment'].primary.attributes.invoke_url;

const aRecordHost = `https://${JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_api_gateway_domain_name.api'].primary.attributes.domain_name}`;

const { path } = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_api_gateway_resource.resource'].primary.attributes;

console.log(gatewayHost);
console.log(aRecordHost);

const query = '?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller';

require('node-fetch')(gatewayHost + path + query)
  .then((res) => {
    console.log(res.status);
    console.log(res.headers.raw());
  });


require('node-fetch')(aRecordHost + path + query)
  .then((res) => {
    console.log(res.status);
    console.log(res.headers.raw());
  });

