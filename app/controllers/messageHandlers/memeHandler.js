var mongoose = require('mongoose'),
    socketIO = require('../socketIO'),
    FeedModel = mongoose.model('Feed');

exports.handleMessage = function (io, data) {
    dbRecord = new FeedModel(data);
	dbRecord.save();

    socketIO.outgoingMessage(io, data);
};
