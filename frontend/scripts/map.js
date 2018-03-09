const mercator = require('projections/mercator');

const projection = ([lon, lat]) => {
  const { x, y } = mercator({
    lon,
    lat,
  }, { latLimit: 80 });
  return [
    +(x * 100).toFixed(3),
    +(y * 100).toFixed(3),
  ];
};

module.exports = (places) => {
  const svg = document.getElementsByTagName('svg')[0];
  places.forEach((place) => {
    const latlang = projection([
      place.lng,
      place.lat,
    ]);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', latlang[0]);
    circle.setAttribute('class', 'been');
    circle.setAttribute('cy', latlang[1]);
    circle.setAttribute('r', 0.2);
    circle.setAttribute('fill', 'red');
    svg.appendChild(circle);
  });
};
