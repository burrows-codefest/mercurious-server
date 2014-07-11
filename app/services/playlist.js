'use strict';

var socks,
    PlaylistModel = require('../models/Playlist');

exports.loadFeed = function (socketIO) {
    socks = socketIO;
};

exports.getAllRecords = function (callback) {
    PlaylistModel.find({}, function (err, results) {
        callback(results);
    });
};

exports.addRecord = function (song, callback) {
    var dbRecord = new PlaylistModel(song);

    dbRecord.save(function (err, song) {
        callback(song);
    });
};
