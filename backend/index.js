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
        succeed = require('./succeed'),
        buildNumber = require('./buildNumber'),

        url = decodeURIComponent(event.url).trim();

    cache.read('json/' + encodeURIComponent(url) + '.json')
        .then(function (map) {
            succeed(context.succeed, {'data': map, 'cached': true});
        })
        .catch(function (e) {
            console.log(e);
            request(url)
                .then(function (data) {

                    var kmlData = kml(data),
                        map = data;
                    map.date = new Date().toISOString();

                    zip.compress(kmlData)
                        .then(function (kmlData) {

                            return upload('kml/' + encodeURIComponent(map.username) + '.kml', kmlData, 'application/vnd.google-earth.kml+xml', 'gzip');
                        })
                        .then(function (kmlUrl) {
                            map.kml = kmlUrl;

                            return new Promise.resolve(map);
                        })
                        .then(csv)
                        .then(zip.compress)
                        .then(function (csvData) {
                            return upload('csv/' + encodeURIComponent(map.username) + '.csv', csvData, 'text/csv', 'gzip');
                        })
                        .then(function (csvUrl) {

                            map.csv = csvUrl;
                            map.buildNumber = buildNumber.buildNumber;
                            cache.write('json/' + encodeURIComponent(url) + '.json', data).then(function () {
                                succeed(context.succeed, {'data': map, 'cached': false});
                            });

                        });

                });
        }).catch(function (err) {
            console.log(err);
            context.fail(err);

        });

};
