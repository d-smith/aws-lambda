var AWS = require('aws-sdk');


AWS.config.update({region: 'us-east-1'});
AWS.config.loadFromPath('../config.json');

var kinesis = new AWS.Kinesis();
var lambda = new AWS.Lambda();

lambda.listFunctions({}, function(err, data) {
  if(err) {
    console.log(err);
  } else {
    console.log(data);
  }
});


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

      var lambdaEventSourceParams = {
        EventSource: streamARN,
        FunctionName: 'streamReader',
        Role: 'arn:aws:iam::930295567417:role/son_of_exec_role',
        Parameters : {
          InitialPositionInStream: 'TRIM_HORIZON'
        }
      };

      lambda.addEventSource(lambdaEventSourceParams, function(err, data) {
        if(err) {
          console.log(err);
        } else {
          console.log(data.Status);
        }
      });
    }
  }
);
