const fetch = require('isomorphic-fetch');

module.exports = url => fetch(url).then(res => res.text());
