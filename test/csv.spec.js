const csv = require('../app/csv');
const fs = require('fs');

const html = fs.readFileSync(`${__dirname}/fixtures/travelmap.html`, 'utf8');
const map = require('../app/map')(html);

test('creates csv', async () => {
  const result = await csv(map);
  expect(result).toMatch(/Schiermonnikoog, The Netherlands/);
});


test('correct csv', async () => {
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
  const result = await csv(input);

  expect(result).toBe('"lat","lon","name","country","city","iso","been"\n46.794476,9.823285,"Davos, Switzerland","Switzerland","Davos","CH","been"');
});
