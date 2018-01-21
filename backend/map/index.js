const parse = require('../parse');

module.exports = html => ({
  date: new Date().toISOString(),
  stats: parse.getStats(html),
  places: parse.getPlaces(html),
  username: parse.getUserName(html),
  lang: parse.getLanguage(html),
  avatar: parse.getAvatar(html),
});
