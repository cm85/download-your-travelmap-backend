module.exports = ctx => ({
  map: ctx.options.map,
  parser: ctx.options.parser,
  plugins: {
    cssnano: {},
    'postcss-hash': {
      algorithm: 'sha256',
      trim: 20,
      manifest: './dist/manifest.json',
    },
  },
});

