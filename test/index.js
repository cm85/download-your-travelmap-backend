/*global require, describe, it, console */

(function () {
    'use strict';
    var app = require('../backend'),
        requestApp = require('../backend/request'),
        https = require('https'),
        xml2js = require('xml2js'),
        parser = new xml2js.Parser(),
        config = require('../backend/config')(),
        expect = require('expect.js/'),
        kml = require('../backend/kml');

    describe('redirect', function () {
        it('301', function (done) {
            this.timeout(9000);
            requestApp('http://www.tripadvisor.co.uk/MemberProfile-a_uid.F3B46B68117496775EE93A2AB6A9C1DC').then(function (data) {
                expect(data.username).to.equal('Atanas_GK');
                done();
            }).catch(function (e) {
                console.log(e);
            });
        });
    });

    describe('no map url', function () {
        it('301', function (done) {
            this.timeout(9000);
            requestApp('https://www.tripadvisor.com.br/Saves?v=list#39842494').then(function () {

            }).catch(function (err) {
                expect(err).to.be.an(Error);
                done();

            });
        });
    });



    describe('https', function () {
        it('should work', function (done) {
            this.timeout(9000);
            requestApp('https://www.tripadvisor.it/members/micampCagliari_Italy').then(function (data) {
                expect(data.username).to.equal('micampCagliari_Italy');
                done();
            }).catch(function (e) {
                console.log(e);
            });
        });
    });

    describe('stage okay', function () {
        it('gateway should send json', function (done) {
            this.timeout(15000);
            https
                .get(config.aws.path + '?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2FCarolinaCoopers', function (res) {
                    var body = '';
                    expect(res.statusCode).to.equal(200);

                    res.on('data', function (chunk) {
                        body += chunk;
                    });
                    res.on('error', function (err) {
                        console.log(err);
                    });
                    res.on('end', function () {
                        expect(JSON.parse(body).data.username).to.equal('CarolinaCoopers');
                        done();
                    });
                });
        });
    });

    describe('app', function () {
        it('Be OK https://en.wikipedia.org/wiki/Be_OK_%28Ingrid_Michaelson_song%29', function (done) {
            this.timeout(7000);
            app.handler({
                'url': decodeURIComponent('http://www.tripadvisor.com/members/christianhaller')
            }, {
                'succeed': function (data) {
                    expect(data.data.username).to.equal('christianhaller');
                    expect(data.data.buildNumber).to.equal('');
                    done();
                },
                fail: function (err) {
                    done(err);
                }
            });
        });


        it('error', function (done) {
            app.handler({
                'url': decodeURIComponent('https://www.tripadvisor.com.br/Saves?v=list#39842494')
            }, {
                'succeed': function () {

                },
                fail: function (err) {
                    expect(err).to.be.an(Error);
                    done();
                }
            });
        });

        it('kml', function (done) {
            var input = {
                    'username': 'robiwan',
                    'places': [
                        {
                            city: 'Davos',
                            county: 'Switzerland',
                            iso: 'CH',
                            lat: 46.794476,
                            lng: 9.823285,
                            name: 'Davos, Switzerland'
                        }
                    ]
                },
                output = kml(input);
            parser.parseString(output, function (err, result) {
                expect(result.kml.Document[0].name[0]).to.equal(input.username + '\'s travelmap');
                done();
            });

        });


        it('404', function (done) {
            this.timeout(4000);
            requestApp(' http://www.tripadvisor.com/christianhaller')
                .catch(function (err) {
                    expect(err).to.equal('profile not found');
                    done();
                });
        });


        it('map request', function (done) {
            this.timeout(6000);
            requestApp(' http://www.tripadvisor.com/TravelMap-a_uid.BAE86B9F2C0155C5003524F652DD4719').then(function (data) {
                expect(data.username).to.equal('surefire56');
                done();
            }).catch(function (err) {
                console.log(err);
            });
        });

        it('wrong url', function (done) {
            this.timeout(4000);
            requestApp('http://www.tripadvisor.com').catch(function (err) {
                expect(err).to.be.an(Error);
                done();
            });
        });

        it('no url', function (done) {
            this.timeout(4000);
            requestApp('').catch(function (err) {
                expect(err).to.be.an(Error);
                done();
            });
        });

        it('bad url', function (done) {
            this.timeout(4000);
            requestApp('http://www.google.com')
                .catch(function (err) {
                    expect(err).to.be.an(Error);
                    done();
                });
        });

        it('very bad url', function (done) {
            this.timeout(4000);
            requestApp('123')
                .catch(function (err) {
                    //console.log(err);
                    expect(err).to.be.an(Error);
                    done();
                });
        });

        it('dns error', function (done) {
            this.timeout(4000);
            requestApp('http://www.google.commmmm')
                .catch(function (err) {
                    expect(err).to.be.an(Error);
                    done();
                });
        });
    });
}());
