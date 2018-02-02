const request = require('./request');
const map = require('./map');
const csv = require('./csv');
const kml = require('./kml');
const parse = require('./parse');
const upload = require('./upload/upload');
const success = require('./success');

exports.handler = async (event, context, callback) => {
  const url = decodeURIComponent(event.queryStringParameters.url).trim();

  const result = await request(url);
  let mapData;

  try {
    mapData = map(result.body);
  } catch (error) {
    try {
      const mapUrl = parse.getMapLink(url, result.body);
      const secondResult = await request(mapUrl);
      mapData = map(secondResult.body);
    } catch (anotherError) {
      return { error: 'URL invalid' };
    }
  }

  mapData.kml = await upload({
    username: mapData.username,
    content: kml(mapData),
    extension: 'kml',
  });


  mapData.csv = await upload({
    username: mapData.username,
    content: await csv(mapData),
    extension: 'csv',
  });

  return success(mapData, callback);
};
