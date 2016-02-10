/*global require, module */
/*jshint maxparams:5 */
(function () {
    'use strict';
    var AWS = require('aws-sdk'),
        Promise = require('promise'),
        config = require('../config')();

    module.exports = function (path, content, contentType, contentEncoding, acl) {
        AWS.config.region = config.aws.s3.region;

        return new Promise(function (fulfill, reject) {

            var params = {
                    'ACL': acl||'public-read',
                    'Bucket': config.aws.s3.bucketName,
                    'Key': path,
                    'ContentEncoding': contentEncoding,
                    'ContentType': contentType,
                    'Body': content
                },

                upload = new AWS.S3.ManagedUpload({params: params});

            upload.send(function (err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('upload '+path);
                    fulfill(data.Location);
                }
            });
        });
    };
}());

