require('../styles/main.scss');
const form = require('./form');
const map = require('./map');

document.addEventListener('DOMContentLoaded', () => {
  map();
  form();
});

