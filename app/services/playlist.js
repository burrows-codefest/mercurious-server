'use strict';

var PlaylistModel = require('../models/Playlist'),
    socks;

exports.loadFeed = function (socketIO) {
    socks = socketIO;
};

exports.getAllRecords = function (callback) {
    PlaylistModel.find({}, function (err, results) {
        callback(results);
    });
};
