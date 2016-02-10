/*global module, require, process */
module.exports = function () {
    'use strict';
    var awsLambdaFunctionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
    if (typeof awsLambdaFunctionName === 'undefined') {
        return require('../../config.local.json');
    }
    if (awsLambdaFunctionName.indexOf('stage') !== -1) {
        console.log('stage');
        require('../config.stage.json');
    }
    else {
        return require('../config.prod.json');
    }
};


