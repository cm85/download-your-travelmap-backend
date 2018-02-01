/* global require, describe, it, console */

(function () {
  let app = require('../backend'),
    requestApp = require('../app/request'),
    https = require('https'),
    xml2js = require('xml2js'),
    csv = require('../app/csv'),
    parser = new xml2js.Parser(),
    config = require('../app/config')(),
    expect = require('expect.js/'),
    kml = require('../app/kml');

  describe('redirect', () => {
    it('301', function (done) {
      this.timeout(9000);
      requestApp('http://www.tripadvisor.co.uk/MemberProfile-a_uid.F3B46B68117496775EE93A2AB6A9C1DC').then((data) => {
        expect(data.username).to.equal('Atanas_GK');
        done();
      }).catch((e) => {
        console.log(e);
      });
    });
  });

  describe('no map url', () => {
    it('301', function (done) {
      this.timeout(9000);
      requestApp('https://www.tripadvisor.com.br/Saves?v=list#39842494').then(() => {

      }).catch((err) => {
        expect(err).to.be.an(Error);
        done();
      });
    });
  });


  describe('https', () => {
    it('should work', function (done) {
      this.timeout(9000);
      requestApp('https://www.tripadvisor.it/members/micampCagliari_Italy').then((data) => {
        expect(data.username).to.equal('micampCagliari_Italy');
        done();
      }).catch((e) => {
        console.log(e);
      });
    });
  });

  describe('stage okay', () => {
    it('gateway should send json', function (done) {
      this.timeout(15000);
      https
        .get(`${config.aws.path}?url=http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2FCarolinaCoopers`, (res) => {
          let body = '';
          expect(res.statusCode).to.equal(200);

          res.on('data', (chunk) => {
            body += chunk;
          });
          res.on('error', (err) => {
            console.log(err);
          });
          res.on('end', () => {
            expect(JSON.parse(body).data.username).to.equal('CarolinaCoopers');
            done();
          });
        });
    });
  });

  describe('app', () => {
    it('Be OK https://en.wikipedia.org/wiki/Be_OK_%28Ingrid_Michaelson_song%29', function (done) {
      this.timeout(7000);
      app.handler({
        url: decodeURIComponent('http://www.tripadvisor.com/members/christianhaller'),
      }, {
        succeed(data) {
          expect(data.data.username).to.equal('christianhaller');
          expect(data.data.buildNumber).to.equal('');
          done();
        },
        fail(err) {
          done(err);
        },
      });
    });


    it('error', (done) => {
      app.handler({
        url: decodeURIComponent('https://www.tripadvisor.com.br/Saves?v=list#39842494'),
      }, {
        succeed() {

        },
        fail(err) {
          expect(err).to.be.an(Error);
          done();
        },
      });
    });

    it('csv', (done) => {
      const input = {
        username: 'robiwan',
        places: [
          {
            city: 'Davos',
            country: 'Switzerland',
            iso: 'CH',
            lat: 46.794476,
            flags: ['been'],
            lng: 9.823285,
            name: 'Davos, Switzerland',
          },
        ],
      };
      csv(input).then((data) => {
        expect(data).to.equal('"lat","lon","name","country","city","iso","been"\n46.794476,9.823285,"Davos, Switzerland","Switzerland","Davos","CH","been"');
        done();
      }).catch((e) => {
        console.log(e);
      });
    });

    it('kml', (done) => {
      let input = {
          username: 'robiwan',
          places: [
            {
              city: 'Davos',
              country: 'Switzerland',
              iso: 'CH',
              lat: 46.794476,
              lng: 9.823285,
              name: 'Davos, Switzerland',
            },
          ],
        },
        output = kml(input);
      parser.parseString(output, (err, result) => {
        expect(result.kml.Document[0].name[0]).to.equal(`${input.username}'s travelmap`);
        done();
      });
    });


    it('404', function (done) {
      this.timeout(4000);
      requestApp(' http://www.tripadvisor.com/christianhaller')
        .catch((err) => {
          expect(err).to.equal('profile not found');
          done();
        });
    });


    it('map request', function (done) {
      this.timeout(6000);
      requestApp('http://www.tripadvisor.com/TravelMap-a_uid.BAE86B9F2C0155C5003524F652DD4719').then((data) => {
        expect(data.username).to.equal('surefire56');
        // be sure it's https
        expect(data.avatar).to.contain('https://media-cdn.tripadvisor.com/media');
        done();
      }).catch((err) => {
        console.log(err);
      });
    });

    it('wrong url', function (done) {
      this.timeout(4000);
      requestApp('http://www.tripadvisor.com').catch((err) => {
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('no url', function (done) {
      this.timeout(4000);
      requestApp('').catch((err) => {
        expect(err).to.be.an(Error);
        done();
      });
    });

    it('bad url', function (done) {
      this.timeout(4000);
      requestApp('http://www.google.com')
        .catch((err) => {
          expect(err).to.be.an(Error);
          done();
        });
    });

    it('very bad url', function (done) {
      this.timeout(4000);
      requestApp('123')
        .catch((err) => {
          // console.log(err);
          expect(err).to.be.an(Error);
          done();
        });
    });

    it('dns error', function (done) {
      this.timeout(4000);
      requestApp('http://www.google.commmmm')
        .catch((err) => {
          expect(err).to.be.an(Error);
          done();
        });
    });
  });
}());
