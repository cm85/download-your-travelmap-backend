const fs = require('fs');
const kml = require('../app/kml');

const html = fs.readFileSync(`${__dirname}/fixtures/travelmap.html`, 'utf8');
const map = require('../app/map')(html);

test('generates kml', () => {
  const actualXML = kml(map);
  expect(actualXML).toMatchSnapshot();
});
