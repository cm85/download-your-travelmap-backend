const fs = require('fs');
const parse = require('../backend/parse');


const html = fs.readFileSync(`${__dirname}/fixtures/travelmap.html`, 'utf8');
const places = require('./fixtures/places');

test('parse username', () => {
  expect(parse.getUserName(html)).toBe('christianhaller');
});

test('parse language', () => {
  expect(parse.getLanguage(html)).toBe('en');
});

test('parse correct avatar url', () => {
  expect(parse.getAvatar(html)).toMatch(/facebook-avatar.jpg/);
});

test('parse link', () => {
  expect(parse.getLink('https://www.tripadvisor.com/members/christianhaller', html)).toBe('https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693');
});

test('parse stats', () => {
  expect(parse.getStats(html)).toEqual({
    city: 184, country: 40, fave: 1, total: 185, want: 1,
  });
});

test('parse places', () => {
  expect(parse.getPlaces(html)).toEqual(places);
});
