const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.REGION });
const ses = new AWS.SES({ apiVersion: '2010-12-01' });

module.exports = (Data) => {
  const params = {
    Destination: {
      ToAddresses: [
        'hallo@christianhaller.com',
      ],
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Test email',
      },
    },
    ReplyToAddresses: [],
    Source: 'travelmap@christianhaller.com',
  };
  return ses.sendEmail(params).promise();
};
