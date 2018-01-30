const request = require('request-promise');

module.exports = async (profileUrl) => {
  const result = await request({
    uri: profileUrl,
    transform: (body, response) => ({
      body,
      status: response.statusCode,
    }),
  });
  return result;
};
