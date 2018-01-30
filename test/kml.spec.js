const fs = require('fs');
const kml = require('../backend/kml');

const html = fs.readFileSync(`${__dirname}/fixtures/travelmap.html`, 'utf8');
const map = require('../backend/map')(html);

test('generates kml', () => {
  expect(kml(map)).toMatch(/<name>christianhaller's travelmap<\/name>/);
  expect(kml(map)).toMatch(/I have been to 185 cities/);
});
