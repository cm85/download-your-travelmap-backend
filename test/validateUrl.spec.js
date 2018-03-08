const validateUrl = require('../app/validateUrl');

test('happy path', () => {
  const result = validateUrl('http://www.tripadvisor.com/abc');
  expect(result).toMatchSnapshot();
});

test('invalid url', () => {
  function validate() {
    validateUrl('http://www.wtf/abc');
  }
  expect(validate).toThrowErrorMatchingSnapshot();
});


test('no url', () => {
  function validate() {
    validateUrl('x');
  }
  expect(validate).toThrowErrorMatchingSnapshot();
});
