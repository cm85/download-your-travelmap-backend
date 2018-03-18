const mercator = require('projections/mercator');
const GoogleMapsLoader = require('google-maps'); // only for common js environments


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
  GoogleMapsLoader.KEY = 'AIzaSyCP7j9YBPek1DQXtTVOOs3E6c6_3cw1qZQ';
  GoogleMapsLoader.load((google) => {
    const map = new google.maps.Map(document.querySelector('.gmap'), {
      center: new google.maps.LatLng(0, 0),
      zoom: 1,
      minZoom: 1,
    });

    const bounds = new google.maps.LatLngBounds();
    places.filter(place => place.flags.includes('been')).forEach((place) => {
      const { lat, lng } = place;
      bounds.extend(new google.maps.LatLng(lat, lng));

      /* eslint-disable no-new */
      new google.maps.Marker({
        position: { lat, lng },
        map,
      });
    });


    map.fitBounds(bounds);
  });
};
