var mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed'),
    socketIO = require('../controllers/socketIO'),
    io;

exports.loadFeed = function (socketIO) {
    io = socketIO;
};

exports.addRecord = function (record) {
    var dbRecord = new FeedModel(record);

    dbRecord.save();

    socketIO.outgoingMessage(io, record);
};
