const request = require('request-promise');

module.exports = profileUrl => request({
  uri: profileUrl,
  transform: (body, response) => ({
    body,
    status: response.statusCode,
  }),
});
