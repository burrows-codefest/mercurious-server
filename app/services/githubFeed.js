'use strict';

var mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed'),
    socketIO = require('../controllers/socketIO'),
    socks;

exports.loadFeed = function (socketIO) {
    socks = socketIO;
};

exports.addRecord = function (record) {
    var dbRecord = new FeedModel(record);

    dbRecord.save();

    socketIO.outgoingMessage(socks, record);
};
