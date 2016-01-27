/*global require,module */
var Promise = require('promise'),
    AWS = require('aws-sdk'),
    gzip = require('../gzip'),
    upload = require('../upload'),
    config = require('../config.json');

module.exports = {
    'read': function (path) {
        'use strict';
        var s3;
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
                    // older than five minutes
                    if((Date.now() - Date.parse(data.LastModified)) > 60 * 1000 * 5){
                        reject('cache outdated');
                    }
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
        'use strict';
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


