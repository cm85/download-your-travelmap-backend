const googleMap = require('./googleMap');
const svgMap = require('./svgMap');

module.exports = (places) => {
  const mapWrapper = document.querySelector('.map');
  const svgElement = mapWrapper.querySelector('svg');
  const googleMapElement = mapWrapper.querySelector('.gmap');

  const button = document.querySelector('.button--googlemaps');

  button.addEventListener('click', () => {
    svgElement.classList.toggle('hide');
    googleMapElement.classList.toggle('show');
  });

  googleMap(googleMapElement, places);
  svgMap(svgElement, places);
};
