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
        catch(e){
            return require('../../config.stage.json');
        }



    }
};


