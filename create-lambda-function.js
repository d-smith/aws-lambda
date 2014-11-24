var AWS = require('aws-sdk');



AWS.config.update({region: 'us-east-1'});
AWS.config.loadFromPath('../config.json');

var httpProxy = process.env.http_proxy;
if(httpProxy !== null) {
  console.log('set http proxy to ' + httpProxy);
  AWS.config.update({
    httpOptions: {
      proxy: httpProxy
    }
  });
} else {
  console.log("No proxy settings found");
}


var lambda = new AWS.Lambda();
var fs = require('fs');

var progArgs = process.argv.slice(2);

if(progArgs.length != 1) {
  console.log("Usage: node %s <lambda function zip file>", process.argv[1]);
  process.exit(1);
}

var zipBuffer = fs.readFileSync(progArgs[0]);
console.log(typeof zipBuffer);

var params = {
  FunctionName: 'Stream logger',
  FunctionZip: zipBuffer,
  Handler: 'kinesisHandler',
  Mode: 'event',
  Description: 'log kinesis data via console.log',
  Role: 'arn:aws:iam::930295567417:role/lambda-kinesis',
  Runtime: 'nodejs'
};

lambda.uploadFunction(params, function(err, data) {
  if(err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
