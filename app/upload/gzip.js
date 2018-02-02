const zlib = require('zlib');
const promisify = require('util.promisify');

const compress = promisify(zlib.gzip);

module.exports = {
  compress: async (file) => {
    const b = Buffer.from(file);
    return compress(b);
  },
};
