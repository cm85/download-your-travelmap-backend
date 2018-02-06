module.exports = (data, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ data }),
  };
  return callback(null, response);
};
