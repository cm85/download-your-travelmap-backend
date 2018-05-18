const { S3 } = require('aws-sdk'); // eslint-disable-line
const mime = require('mime-types');
const path = require('path');


const s3Api = {
  save: (conf) => {
    const params = {
      ContentType: mime.lookup(path.extname(conf.Key)),
      ACL: 'public-read',
      ...conf,
    };
    return new S3().putObject(params).promise();
  },
};

module.exports = s3Api;
