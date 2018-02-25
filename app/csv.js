const fields = ['lat', 'lon', 'name', 'country', 'city', 'iso', 'been'];
const Json2csvParser = require('json2csv').Parser;


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

  const json2csvParser = new Json2csvParser({
    fields,
  });

  return json2csvParser.parse(map);
};

