var mongoose = require('mongoose'),
    socketIO = require('../socketIO'),
    FeedModel = mongoose.model('Feed');

exports.handleMessage = function (io, socket, data) {
    var dbRecord;

    data.publishedDate = new Date(Number(data.publishedDate));

    dbRecord = new FeedModel(data);
    dbRecord.save(function (err, record) {
        socketIO.outgoingMessage(io, record)
    });
};
