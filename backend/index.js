const request = require('./request');
const map = require('./map');
const parse = require('./parse');

exports.handler = async (event, context, callback) => {
  const url = decodeURIComponent(event.queryStringParameters.url).trim();

  const result = await request(url);

  if (result.status === 200) {
    const mapUrl = parse.getMapLink(url, result.body);
    const mapHtml = await request(mapUrl);
    const mapData = map(mapHtml.body);
  }

  // console.log(result.status);
};
