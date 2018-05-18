module.exports = (error, success = null) => {
  const mock = jest.fn();

  mock.mockImplementation(() => ({
    promise: () => {
      if (error) {
        return Promise.reject(error);
      }

      return Promise.resolve(success);
    },
  }));

  return mock;
};
