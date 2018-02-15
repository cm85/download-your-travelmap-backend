module.exports = (status, data, callback) => {
  const response = {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': 'https://download-your-travelmap.christianhaller.com',
    },
    body: JSON.stringify(data),
  };
  return callback(null, response);
};
