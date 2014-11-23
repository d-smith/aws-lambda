console.log('Loading event');

exports.kinesisHandler = function(event, context) {
    console.log(context);
    var records = event.Records;
    records.forEach(function(entry) {
        console.log(entry.data);
    });
    context.done(null, 'invoke done');  // SUCCESS with message
};
