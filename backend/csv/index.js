const promisify = require('util.promisify');
const json2csv = promisify(require('json2csv'));

const fields = ['lat', 'lon', 'name', 'country', 'city', 'iso', 'been'];

module.exports = (data) => {
  const map = data.places.map((item) => {
    item.been = item.flags.join(',');
    item.lon = item.lng;
    return item;
  });

  return json2csv({
    data: map,
    fields,
  });
};

