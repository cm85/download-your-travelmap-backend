const sanitize = require('sanitize-filename');
const { compress } = require('./gzip');
const { save } = require('./s3');

module.exports = async (data) => {
  const Body = await compress(JSON.stringify(data.Body));
  const Key = sanitize(`${data.Username}-${data.Key}`);

  await save({ ContentEncoding: 'gzip', Key, Body });

  return Key;
};
