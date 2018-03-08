const url = require('url');

module.exports = (inputUrl) => {
  let parsedUrl;
  try {
    parsedUrl = url.parse(inputUrl);
    if (!parsedUrl.hostname.includes('tripadvisor')) {
      throw new Error('Please enter your TripAdvisor profile URL');
    }
    return true;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Please enter a valid URL');
    } else throw error;
  }
};
