const fs = require('fs');
const parse = require('../backend/parse');


const html = fs.readFileSync(`${__dirname}/fixtures/travelmap.html`, 'utf8');
const profile = fs.readFileSync(`${__dirname}/fixtures/profile.html`, 'utf8');
const empty = fs.readFileSync(`${__dirname}/fixtures/empty.html`, 'utf8');
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

test('parse travelmap link', () => {
  expect(parse.getMapLink('https://www.tripadvisor.com/members/christianhaller', html)).toBe('https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693');
});

test('parse stats', () => {
  expect(parse.getStats(html)).toEqual({
    city: 184, country: 40, fave: 1, total: 185, want: 1,
  });
});

test('parse places', () => {
  expect(parse.getPlaces(html)).toEqual(places);
});

test('parse map link', () => {
  expect(parse.getMapLink('https://www.tripadvisor.com/members/christianhaller', html)).toEqual('https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693');

  expect(parse.getMapLink('https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693', profile)).toEqual('https://www.tripadvisor.com/TravelMap-a_uid.F16A76DBDC7075B786CC2C71B9198693');

  expect(() => { parse.getMapLink('https://www.google.com', empty); }).toThrowError('invalid url');
});
