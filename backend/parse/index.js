const url = require('url');
const iso = require('../iso');

const getStringBetween = (str, start, end) => {
  const left = str.substring(str.indexOf(start) + start.length);
  return left.substring(left.indexOf(end), -left.length);
};

module.exports = {

  getStats(html) {
    const str = getStringBetween(html, '"idKeys":["memberId"],"properties":{"country":', '</html>');
    return JSON.parse(`{"country":${getStringBetween(str, '"idKeys":["memberId"],"properties":{"country":', '}')}}`);
  },
  getMapLink(profileUrl, html) {
    const prefix = '/TravelMap-a_uid.';
    const urlParts = url.parse(profileUrl);
    return `${urlParts.protocol}//${urlParts.hostname}${prefix}${getStringBetween(html, prefix, '"')}`;
  },
  getAvatar(html) {
    let avatar = getStringBetween(html, 'class="avatarUrl" src="', '"');
    avatar = avatar.replace('http://', 'https://');
    return avatar;
  },
  getLanguage(html) {
    return getStringBetween(html, 'bingMapsLang = "', '"');
  },
  getUserName(html) {
    return getStringBetween(html, '<div class="memberTitle">', '<');
  },
  getPlaces(html) {
    const taPlaces = JSON.parse(`{"${getStringBetween(html, '"store":{"', ',"modules.membercenter.model.FriendCount')}}`)['modules.unimplemented.entity.LightWeightPin'];

    return Object.keys(taPlaces).map((key) => {
      const place = taPlaces[key];
      const name = place.name;
      const arrayOfStrings = name.split(',');
      const cityName = arrayOfStrings[0];
      const countryName = arrayOfStrings[1].trimLeft();
      const isoCode = iso.get(countryName);
      return {
        city: cityName,
        country: countryName,
        iso: isoCode,
        flags: place.flags,
        lat: place.lat,
        lng: place.lng,
        name,
      };
    });
  },
};
