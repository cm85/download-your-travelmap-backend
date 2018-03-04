const AWS = require('aws-sdk'); // eslint-disable-line
const mime = require('mime-types');
const path = require('path');

const s3 = new AWS.S3({
  params: {
    Bucket: process.env.BUCKET,
  },
  region: process.env.REGION,
});


const s3Api = {
  save: (conf) => {
    const params = {
      ContentType: mime.lookup(path.extname(conf.Key)),
      ACL: 'public-read',
      ...conf,
    };
    return s3.putObject(params).promise();
  },
};

module.exports = s3Api;
