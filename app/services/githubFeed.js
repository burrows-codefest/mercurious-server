'use strict';

var GithubModel = require('../models/Github')(),
    socketIO = require('../controllers/socketIO'),
    socks;

exports.loadFeed = function (socketIO) {
    socks = socketIO;
};

exports.addRecord = function (record) {
    var dbRecord = new GithubModel(record);

    dbRecord.save();

    socketIO.outgoingMessage(socks, record);
};
