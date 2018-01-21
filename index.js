exports.handler = (event, context, callback) => {

  var response = {
          "statusCode": 200,
          "headers": {
              "my_header": "my_value"
          },
          "body": JSON.stringify(event),
          "isBase64Encoded": false
      };
      callback(null, response);
}
