const GoogleMapsLoader = require('google-maps');

module.exports = (mapElement, places) => {
  GoogleMapsLoader.KEY = 'AIzaSyCP7j9YBPek1DQXtTVOOs3E6c6_3cw1qZQ';
  GoogleMapsLoader.load((google) => {
    const map = new google.maps.Map(mapElement, {
      center: new google.maps.LatLng(0, 0),
    });

    const bounds = new google.maps.LatLngBounds();
    const x = places.slice(0, 3);
    console.log(x.length);
    x.filter(place => place.flags.includes('been')).forEach((place) => {
      const { lat, lng } = place;
      const position = new google.maps.LatLng(lat, lng);
      bounds.extend(position);

      /* eslint-disable no-new */
      new google.maps.Marker({
        position,
        map,
      });
    });

    console.log(bounds);
    map.fitBounds(bounds);
  });
};
