/*global require, console */
(function (require) {
    'use strict';
    // http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2FCarolinaCoopers
    require('./index').handler({'url': 'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller'}, {'succeed': function (data) {
        console.log(data.env + ' ' + data.data.username);
    }, fail: function (err) {
        console.log('reject');
        console.log(err);
    }});
}(require));
