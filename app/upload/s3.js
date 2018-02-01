const AWS = require('aws-sdk'); // eslint-disable-line
const promisify = require('util.promisify');
const mime = require('mime-types');
const path = require('path');


const s3 = new AWS.S3({
  params: {
    Bucket: 'new-download-your-travelmap',
  },
  region: 'us-east-1',
});


const s3Api = {
  save: (conf) => {
    const params = {
      ContentType: mime.lookup(path.extname(conf.Key)),
      ACL: 'public-read',
      ...conf,
    };
    return promisify(s3.putObject.bind(s3))(params);
  },
};

module.exports = s3Api;
