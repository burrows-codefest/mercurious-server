'use strict';

var GithubModel = require('../models/Github'),
    constants = require('../../config/constants'),
    socks;

exports.loadFeed = function (socketIO) {
    socks = socketIO;
};

exports.addRecord = function (record) {
    var dbRecord = new GithubModel(record);

    dbRecord.save(function (err, newRecord) {
        socks.emit(constants.SOCKET.GITHUB_NEW_PR, newRecord);
    });
};

exports.updateRecord = function (record) {
    GithubModel.findOneAndUpdate({id: record.id}, {$set: {status: record.status, closedDate: record.closedDate}},
        function (err, updatedRecord) {
            socks.emit(constants.SOCKET.GITHUB_UPDATED_PR, updatedRecord);
        });
};

exports.addComment = function (record) {
    GithubModel.findOne({issueNumber: record.issueNumber, repositoryId: record.repositoryId},
        function (err, dbRecord) {
            delete record.issueNumber;
            delete record.repositoryId;

            dbRecord.comments.push(record);
            dbRecord.save(function (err, updatedRecord) {
                socks.emit(constants.SOCKET.GITHUB_UPDATED_PR, updatedRecord);
            });
        });
};

exports.getAllRecords = function (callback) {
    GithubModel.find({}, function (err, results) {
        callback(results);
    });
};
