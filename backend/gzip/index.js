const zlib = require('zlib');
const promisify = require('util.promisify');

const compress = promisify(zlib.gzip);
const decompress = promisify(zlib.gunzip);

module.exports = {
  compress: async (file) => {
    const b = Buffer.from(file);
    return compress(b);
  },
  decompress: async (file) => {
    try {
      const decompressed = await decompress(file);
      return decompressed;
    } catch (err) {
      console.log('error');
      return Promise.resolve(file);
    }
  },
};
