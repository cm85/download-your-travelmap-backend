/*global require,module */
var Promise = require('promise'),
    gzip = require('gzip-buffer');

module.exports = {
    'compress': function (str) {
        'use strict';
        return new Promise(function (fulfill) {
            gzip.gzip(str, function (zipped) {
                //console.log('compressed');
                fulfill(zipped);
            });
        });
    },
    'uncompress': function (str) {
        'use strict';
        return new Promise(function (fulfill) {
            gzip.gunzip(str, function (unzipped) {
                //console.log('compressed');
                fulfill(unzipped);
            });
        });
    }
};
