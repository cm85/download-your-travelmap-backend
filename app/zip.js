const AdmZip = require('adm-zip');


module.exports = (files) => {
  // creating archives
  const zip = new AdmZip();


  files.forEach((file) => {
    // add file directly
    zip.addFile(`travelmap.${file.type}`, Buffer.from(file.content), 'entry comment goes here');
  });


  return zip.toBuffer();
};

