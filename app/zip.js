const AdmZip = require('adm-zip');

module.exports = (files) => {
  const zip = new AdmZip();

  files.forEach((file) => {
    zip.addFile(`${file.username}.${file.type}`, Buffer.from(file.content));
  });

  return zip.toBuffer();
};

