const mercator = require('projections/mercator');

const projection = ([lon, lat]) => {
  const { x, y } = mercator({ lon, lat }, { latLimit: 80 });
  return [
    +(x * 100).toFixed(3),
    +(y * 100).toFixed(3),
  ];
};

const svg = document.getElementsByTagName('svg')[0]; // Get svg element
const circles = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

const latlang = projection([9.73322, 52.37052]);
circles.setAttribute('cx', latlang[0]);
circles.setAttribute('class', 'been');
circles.setAttribute('cy', latlang[1]);
circles.setAttribute('r', 0.4);
svg.appendChild(circles);
//
