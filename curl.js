const fs = require('fs');

const gatewayHost = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_api_gateway_deployment.MyDemoDeployment'].primary.attributes.invoke_url;

const aRecordHost = `https://${JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_api_gateway_domain_name.api'].primary.attributes.domain_name}`;

const { path } = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_api_gateway_resource.resource'].primary.attributes;

const query = '?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller';
// console.log(gatewayHost + path + query);
// console.log(aRecordHost + path + query);


require('node-fetch')(gatewayHost + path + query)
  .then(async (res) => {
    console.log(res.status);
    // console.log(res.headers.raw());
    // console.log(await res.text());
  });


require('node-fetch')(aRecordHost + path + query)
  .then(async (res) => {
    console.log(res.status);
    // console.log(res.headers.raw());
    // console.log(await res.text());
  });

// window.fetch('https://api-dytm2018.christianhaller.com/free-my-map?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller').then(async(res)=>{console.log(await res.text())});
