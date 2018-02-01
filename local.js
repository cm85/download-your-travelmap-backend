require('./app/index').handler({ queryStringParameters: { url: 'http%3A%2F%2Fwww.tripadvisor.com%2Fmembers%2Fchristianhaller' } }, {
  succeed(data) {
    console.log(`${data.env} ${data.data.username}`);
  },
  fail(err) {
    console.log(err);
  },
});
