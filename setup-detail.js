var AWS = require('aws-sdk');


AWS.config.update({region: 'us-east-1'});
AWS.config.loadFromPath('../config.json');

var lambda = new AWS.Lambda();

lambda.getFunctionConfiguration({FunctionName: 'streamReader'}, function(err, data) {
  if(err) {
    console.log(err);
  } else {
    console.log("function configuration");
    console.log(data);
  }
});

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

      lambda.listEventSources({
        EventSourceArn: streamARN,
        FunctionName: 'streamReader'
      }, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          console.log(data);
        }
      });
    }
});
