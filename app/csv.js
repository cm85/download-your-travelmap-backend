const promisify = require('util.promisify');
const json2csv = promisify(require('json2csv'));

const fields = ['lat', 'lon', 'name', 'country', 'city', 'iso', 'been'];

module.exports = (data) => {
  const map = data.places.map(item => ({
    been: item.flags.join(','),
    lat: item.lat,
    name: item.name,
    lon: item.lng,
    country: item.country,
    city: item.city,
    iso: item.iso,
  }));

  return json2csv({
    data: map,
    fields,
  });
};

