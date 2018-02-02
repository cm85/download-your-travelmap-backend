module.exports = (data, callback) => {
  const response = {
    statusCode: 200,
    headers: {
      'x-custom-header': 'my custom header value',
    },
    body: JSON.stringify({ data }),
  };
  return callback(null, response);
};
