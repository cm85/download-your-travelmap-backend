/* eslint-disable */
const payload = { queryStringParameters: { url: 'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller' } };
process.env.BUCKET = require('./infrastructure/variables.tf.json').variable[2].download.default;
process.env.AWS_REGION = 'us-east-1';
const app = require('./app/index');
const cb = (obj, res) => {
    console.log(JSON.parse(res.body).username);
};

let babelApp;

try{
  //babelApp = require('./output/index');
  //babelApp.handler(payload, null, cb);

}
catch(error){
  console.log('babelApp failed')
}
app.handler(payload, null, cb);







