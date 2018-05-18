const { SES } = require('aws-sdk');

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
  return new SES().sendEmail(params).promise();
};
