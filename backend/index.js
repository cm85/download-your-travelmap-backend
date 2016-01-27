/*global exports, require */
exports.handler = function (event, context) {
    'use strict';
    var request = require('./request'),
        Promise = require('promise'),
        csv = require('./csv'),
        cache = require('./cache'),
        zip = require('./gzip'),
        kml = require('./kml'),
        upload = require('./upload'),
        buildNumber = require('./buildNumber'),
        map,
        url = decodeURIComponent(event.url).trim();


    cache.read('json/' + encodeURIComponent(url) + '.json')
        .then(function (data) {
            console.log('found');
            context.succeed({'data': data});

        })
        .catch(function () {
            request(url)
                .then(function (data) {
                    cache.write('json/' + encodeURIComponent(url) + '.json', data)
                        .then(function () {
                            var kmlData = kml(data);
                            map = data;
                            map.date = new Date().toISOString();

                            zip.compress(kmlData)
                                .then(function (kmlData) {
                                    return upload('kml/' + encodeURIComponent(map.username) + '.kml', kmlData, 'application/vnd.google-earth.kml+xml', 'gzip');
                                })
                                .then(function (url) {
                                    map.kml = url;
                                    return new Promise.resolve(map);
                                })
                                .then(csv)
                                .then(zip.compress)
                                .then(function (csvData) {
                                    return upload('csv/' + encodeURIComponent(map.username) + '.csv', csvData, 'text/csv', 'gzip');
                                })
                                .then(function (url) {
                                    map.csv = url;
                                    map.buildNumber = buildNumber.buildNumber;
                                    context.succeed({'data': map});
                                });

                        });
                }).catch(function (err) {
                    console.log(err);
                    context.fail(err);

                });
        });
};
