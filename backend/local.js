/*global require, console */
(function (require) {
    'use strict';
    require('./index').handler({'url': 'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2FCarolinaCoopers'}, {'succeed': function (data) {
        console.log(data);
    }, fail: function (err) {
        console.log('reject');
        console.log(err);
    }});
}(require));


