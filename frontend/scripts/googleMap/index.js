const GoogleMapsLoader = require('google-maps');

module.exports = (mapElement, places) => {
  GoogleMapsLoader.KEY = 'AIzaSyCP7j9YBPek1DQXtTVOOs3E6c6_3cw1qZQ';
  GoogleMapsLoader.load((google) => {
    const map = new google.maps.Map(mapElement, {
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
