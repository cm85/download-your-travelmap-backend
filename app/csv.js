const fields = ['lat', 'lon', 'name', 'country', 'city', 'iso', 'been'];
const { Parser } = require('json2csv');


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

  return new Parser({
    fields,
  }).parse(map);
};

