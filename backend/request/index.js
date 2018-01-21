
const request = require('request-promise');
const parse = require('../parse');

// get host and path
const getRequestOptions = str => ({
  url: str,
  headers: {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'de-DE,de;q=0.8,en-US;q=0.6,en;q=0.4',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
  },
});

const parseMapLink = (profileUrl, html) => parse.getLink(profileUrl, html);

module.exports = async (profileUrl) => {
  let mapCallback = function (response) {
      try {
        fullfil(parseResponse(profileUrl, response));
      } catch (e) {
        reject(new Error(`can't parse ${profileUrl}, please double check your input`));
      }
    },

    profileCallback = function (response) {
      const mapUrl = parseMapLink(profileUrl, response);
      try {
        fullfil(parseResponse(profileUrl, response));
      } catch (e) {
        if (mapUrl !== undefined) {
          request(getRequestOptions(mapUrl), (err, response) => {
            mapCallback(response.body);
          });
        } else {
          reject(new Error(e));
        }
      }
    };

  try {
    const result = await request({
      uri: profileUrl,
      transform: (body, response) => ({
        body,
        status: response.statusCode,
      }),
    });
    return result;
  } catch (error) {
    console.log(error);
  }

  /* request(getRequestOptions(profileUrl), (error, response) => {
    if (error) {
      reject(new Error(error));
      return;
    }

    if (response.statusCode === 404) {
      reject('profile not found');
    }
    if (response.statusCode === 301) {
      request(getRequestOptions(response.headers.location), (error, response) => {
        profileCallback(response.body);
      });
    } else {
      profileCallback(response.body);
    }
  }); */
};
