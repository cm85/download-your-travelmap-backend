/*global module, require */
module.exports = function () {
    'use strict';
    try {
        return require('../config.stage.json');
    }
    catch (e) {
        try {
            return require('../config.prod.json');
        }
        catch(exception){
            return require('../../config.local.json');
        }
    }
};


