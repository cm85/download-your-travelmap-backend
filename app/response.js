module.exports = (status, data, callback) => {
  const response = {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
  return callback(null, response);
};
