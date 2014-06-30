'use strict';

var GithubModel = require('../models/Github'),
    socks;

exports.loadFeed = function (socketIO) {
    socks = socketIO;
};

exports.addRecord = function (record) {
    var dbRecord = new GithubModel(record);

    dbRecord.save();
};

exports.updateRecord = function (record) {
    GithubModel.findOneAndUpdate({id: record.id}, {$set: {status: record.status, closedDate: record.closedDate}},
        function () {});
};
