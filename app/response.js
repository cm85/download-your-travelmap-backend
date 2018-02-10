module.exports = (status, data, callback) => {
  const response = {
    statusCode: status,
    body: JSON.stringify(data),
  };
  return callback(null, response);
};
