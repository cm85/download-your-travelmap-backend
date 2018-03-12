const functionName = 'download-your-travelmap-reloaded';
const region = 'us-east-1';
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
    console.log(err, err.stack); /* eslint-disable-line no-console */
  } else {
    console.log(data.Payload); /* eslint-disable-line no-console */
    console.log(JSON.parse(JSON.parse(data.Payload).body).username); /* eslint-disable-line */
  }
});
