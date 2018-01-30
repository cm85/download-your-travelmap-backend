const csv = require('../backend/csv');
const fs = require('fs');

const html = fs.readFileSync(`${__dirname}/fixtures/travelmap.html`, 'utf8');
const map = require('../backend/map')(html);

test('creates csv', async () => {
  const result = await csv(map);
  expect(result).toMatch(/Schiermonnikoog, The Netherlands/);
});

