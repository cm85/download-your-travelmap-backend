const request = require('./request');
const map = require('./map');
const parse = require('./parse');

module.exports = async (url) => {
  const result = await request(url);

  try {
    return map(result);
  } catch (error) {
    try {
      const mapUrl = parse.getMapLink(url, result);
      const secondResult = await request(mapUrl);
      return map(secondResult);
    } catch (anotherError) {
      throw new Error('invalid Url');
    }
  }
};
