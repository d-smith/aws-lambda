var AWS = require('aws-sdk');


AWS.config.update({region: 'us-east-1'});
AWS.config.loadFromPath('../config.json');

var kinesis = new AWS.Kinesis();


kinesis.describeStream({
    StreamName : "loggingStream2",
    Limit: 1
  },
  function(err,data) {
    if(err) {
      console.log(err);
    } else {
      var streamARN = data.StreamDescription.StreamARN;
      console.log(streamARN);
    }
  }
);

var lambda = new AWS.Lambda();
