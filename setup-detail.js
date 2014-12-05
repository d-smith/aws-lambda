var AWS = require('aws-sdk');


AWS.config.update({region: 'us-east-1'});
AWS.config.loadFromPath('../config.json');

var httpProxy = process.env.http_proxy;
if(httpProxy !== undefined) {

  var HttpProxyAgent = require('https-proxy-agent');
  var proxyAgent = new HttpProxyAgent(httpProxy);
  AWS.config.httpOptions = { agent: proxyAgent };

} else {
  console.log("No proxy settings found");
}



var lambda = new AWS.Lambda();
var kinesis = new AWS.Kinesis();

var listEventSourcesForStream = function() {
  kinesis.describeStream({
    StreamName : "loggingStream2",
    Limit: 1
  },
  function(err,data) {
    if(err) {
      console.log(err);
    } else {
      var streamARN = data.StreamDescription.StreamARN;
      console.log('list event sources for %s', streamARN);



      lambda.listEventSources({
        EventSourceArn: streamARN,
        FunctionName: 'streamReader'
      }, function(err, data) {
        console.log(this.httpResponse.body.toString());
        if(err) {
          console.log(err);
          process.exit(1);
        } else {
          console.log(data);
        }
      });
    }
  });
};



var describeFunctionConfig = function() {
  lambda.getFunctionConfiguration({FunctionName: 'streamReader'}, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      console.log("function configuration");
      console.log(data);
    }
  });
};

listEventSourcesForStream();
describeFunctionConfig();
