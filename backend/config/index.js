/*global module, require, process */
module.exports = function () {
    'use strict';
    var awsLambdaFunctionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
    if (typeof awsLambdaFunctionName === 'undefined') {
        console.log('local');
        return require('../config.local.json');
    }
    if (awsLambdaFunctionName.indexOf('stage') !== -1) {
        console.log('stage');
        return require('../config.stage.json');
    }
    else {
        console.log('prod');
        return require('../config.prod.json');
    }
};


