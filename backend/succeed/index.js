/* global module, require */
var config = require('../config')();
module.exports = function (succeed, data) {
    'use strict';
    data.env = config.env;
    succeed(data);
};
