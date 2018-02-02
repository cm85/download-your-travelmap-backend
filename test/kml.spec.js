require('jest-xml-matcher');
const fs = require('fs');
const kml = require('../app/kml');

const html = fs.readFileSync(`${__dirname}/fixtures/travelmap.html`, 'utf8');
const map = require('../app/map')(html);

test('generates kml', () => {
  const expectedXML = fs.readFileSync(`${__dirname}/fixtures/christianhaller.kml`, 'utf8');
  const actualXML = kml(map);
  expect(actualXML).toEqualXML(expectedXML);
});
