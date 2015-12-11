/*global require, module */
var http = require('http'),
    url = require('url'),
    Promise = require('promise'),
    parse = require('../parse'),

// get host and path
    getRequestOptions = function (str) {
        'use strict';
        var urlParts = url.parse(str);
        return {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
            },
            host: urlParts.host,
            path: urlParts.path
        };
    },
    parseResponse = function (profileUrl, html) {
        'use strict';
        var map = {};
        map.stats = parse.getStats(html);
        map.places = parse.getPlaces(html);
        map.username = parse.getUserName(html);
        map.lang = parse.getLanguage(html);
        map.avatar = parse.getAvatar(html);
        return map;
    },
    parseMapLink = function (profileUrl, html) {
        'use strict';
        return parse.getLink(profileUrl, html);
    };

module.exports = function (profileUrl) {
    'use strict';
    return new Promise(function (fullfil, reject) {
        var mapCallback = function (response) {
                var str = '';
                response.on('data', function (chunk) {
                    str += chunk;
                });
                response.on('end', function () {
                    try {
                        fullfil(parseResponse(profileUrl, str));
                    } catch (e) {
                        reject(new Error('can\'t parse ' + profileUrl + ', please double check your input'));

                    }
                });
            },

            profileCallback = function (response) {
                var html = '';

                response.on('data', function (chunk) {
                    html += chunk;
                });
                response.on('end', function () {
                    var mapUrl = parseMapLink(profileUrl, html);
                    try {
                        fullfil(parseResponse(profileUrl, html));
                    } catch (e) {
                        if (mapUrl !==  undefined) {
                            http.get(getRequestOptions(mapUrl), mapCallback).end();
                        } else {
                            reject(new Error(e));
                        }
                    }
                });
            },
            res = http.get(getRequestOptions(profileUrl), function (data) {
                if (data.statusCode === 404) {
                    reject('profile not found');


                }

                if (data.statusCode === 301) {
                    http.get(getRequestOptions(data.headers.location), function (data) {
                        profileCallback(data);
                    });
                } else {
                    profileCallback(data);
                }
            });
        res.on('error', function (err) {
            reject(err);
        });
    });
};
