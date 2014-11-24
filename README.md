# Kinesis Lambda Sample

For this sample, I set up the function (code in `kinesis-lambda-fn.js`) in the
lambda console. To associate it with a Kinesis stream, I used the code in
`setup-kinesis-event.js`, and used `setup-detail.js to` verify it. The code
in `reader.js` reads from the kinesis stream and prints it to the console,
handy for verifying the stream has events that can be consumed.

For consuming Kinesis events, you need to have appropriate permissions for
Kinesis in the role associate with the lambda event source params. Without
the right permissions, the function can be executed in the test console but will
not be fed any events at runtime.

20141124 - Added create-lambda-function.js and kinesis-lambda-fn.zip, have not been able to execute this sucessfully with an http proxy configured. I need to try this in the absense of a proxy to see if it is a code issue or a proxy issue.
