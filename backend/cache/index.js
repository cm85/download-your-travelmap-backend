/*global require,module */
var Promise = require('promise'),
    AWS = require('aws-sdk'),
    gzip = require('../gzip'),
    upload = require('../upload'),
    config = require('../config.json'),
    s3;

module.exports = {
    'read': function (path) {
        console.log('read');
        AWS.config.region = config.aws.prod.s3.region;
        s3 = new AWS.S3();
        return new Promise(function (fulfill, reject) {
            s3.getObject({
                'Bucket': config.aws.prod.s3.bucketName,
                'Key': path
            }, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    gzip.uncompress(data.Body)
                        .then(function (data) {
                            var map = JSON.parse(data.toString());
                            fulfill(map);
                    }).catch(reject);
                }
            });
        });
    },
    'write': function (path, data) {
        return new Promise(function (fulfill, reject) {
            gzip.compress(JSON.stringify(data))
                .then(function(gzipped){
                upload(path, gzipped, 'application/json', 'gzip')
                    .then(function(){
                        fulfill(data);
                    });
            }).catch(reject);
        });
    }
};


