var GithubModel = require('../models/Github')(),
    socketIO = require('../controllers/socketIO'),
    io;

exports.loadFeed = function (socketIO) {
    io = socketIO;
};

exports.addRecord = function (record) {
    var dbRecord = new GithubModel(record);

    dbRecord.save();

    socketIO.outgoingMessage(io, record);
};
