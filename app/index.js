const request = require('./request');
const map = require('./map');
const csv = require('./csv');
const kml = require('./kml');
const parse = require('./parse');
const { save } = require('./s3');
const zip = require('./zip');
const response = require('./response');
const sanitize = require('sanitize-filename');
const url = require('url');

exports.handler = async (event, context, callback) => {
  try {
    const inputUrl = decodeURIComponent(event.queryStringParameters.url).trim();

    if (!url.parse(inputUrl).hostname.includes('tripadvisor')) {
      return response(500, { error: 'Please enter your TripAdvisor profile URL' }, callback);
    }

    const result = await request(inputUrl);
    let mapData;

    try {
      mapData = map(result.body);
    } catch (error) {
      try {
        const mapUrl = parse.getMapLink(inputUrl, result.body);
        const secondResult = await request(mapUrl);
        mapData = map(secondResult.body);
      } catch (anotherError) {
        return response(500, { error: 'invalid URL' }, callback);
      }
    }

    const username = sanitize(mapData.username);

    const zipFile = await zip([
      {
        content: kml(mapData),
        type: 'kml',
        username,
      },
      {
        content: await csv(mapData),
        type: 'csv',
        username,
      },
    ]);

    // save to s3
    await save({
      Key: `${username}.zip`,
      Body: zipFile,
    });

    return response(200, mapData, callback);
  } catch (error) {
    console.log(error);
    return response(500, { error: `invalid URL\n ${JSON.stringify(event)}` }, callback);
  }
};
