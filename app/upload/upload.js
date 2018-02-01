const sanitize = require('sanitize-filename');
const { compress } = require('./gzip');
const { save } = require('./s3');

module.exports = async (data) => {
  const Body = await compress(data.content);
  const Key = sanitize(`${data.username}.${data.extension}`);

  await save({ ContentEncoding: 'gzip', Key, Body });

  return Key;
};
