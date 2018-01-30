const request = require('./request');
const map = require('./map');
const csv = require('./csv');
const kml = require('./kml');
const parse = require('./parse');

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

  const kmlData = kml(mapData);
  const csvData = await csv(mapData);
  console.log(kmlData);
  return mapData;


  // console.log(result.status);
};
