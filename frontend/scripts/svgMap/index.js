const projection = require('./projection');

module.exports = (svgElement, places) => {
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
    svgElement.appendChild(circle);
  });
};
