const csv = require('./csv');
const kml = require('./kml');

const getMapData = require('./getMapData');
const { save } = require('./s3');
const zip = require('./zip');
const response = require('./response');
const sanitize = require('sanitize-filename');
const validateUrl = require('./validateUrl');
const email = require('./email');

exports.handler = async (event, context, callback) => {
  try {
    const inputUrl = decodeURIComponent(event.queryStringParameters.url).trim();

    validateUrl(inputUrl);
    const mapData = await getMapData(inputUrl);
    const username = sanitize(mapData.username);

    const zipFile = zip([
      {
        content: kml(mapData),
        type: 'kml',
        username,
      },
      {
        content: csv(mapData),
        type: 'csv',
        username,
      },
    ]);

    // save to s3
    await save({
      Bucket: process.env.BUCKET,
      Key: `${username}.zip`,
      Body: zipFile,
    });

    mapData.zip = `${username}.zip`;

    await email(`${username}`);
    return response(200, mapData, callback);
  } catch (error) {
    console.error(error); // eslint disable-line
    return response(500, error.message, callback);
  }
};
