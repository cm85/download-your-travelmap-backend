const request = require('./request');
const map = require('./map');
const csv = require('./csv');
const kml = require('./kml');
const parse = require('./parse');
const { save } = require('./s3');
const zip = require('./zip');
const success = require('./success');
const sanitize = require('sanitize-filename');

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

  const username = sanitize(mapData.username);

  const zipFile = await zip([{
    content: kml(mapData),
    type: 'kml',
    username,
  }, {
    content: await csv(mapData),
    type: 'csv',
    username,
  }]);

  // save to s3
  await save({
    Key: `${username}.zip`,
    Body: zipFile,
  });

  return success(mapData, callback);
};
