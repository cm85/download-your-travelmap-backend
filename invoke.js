const fs = require('fs');

const functionName = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_lambda_function.lambda'].primary.id;
const region = JSON.parse(fs.readFileSync('./infrastructure/terraform.tfstate', 'utf8')
  .toString()).modules[0].resources['aws_lambda_function.lambda'].primary.attributes['environment.0.variables.REGION'];
const AWS = require('aws-sdk');

const lambda = new AWS.Lambda({
  region,
});


const params = {
  ClientContext: Buffer.from(JSON.stringify({})).toString('base64'),
  FunctionName: functionName,
  InvocationType: 'RequestResponse',
  LogType: 'Tail',
  Payload: '{ "queryStringParameters": { "url": "http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller" } }',
};
lambda.invoke(params, (err, data) => {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log(data.Payload);
    console.log(JSON.parse(JSON.parse(data.Payload).body).username);
  }
});
