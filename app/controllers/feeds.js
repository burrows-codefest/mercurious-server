'use strict';
var constants = require('../../config/constants'),
    FeedModel = require('../models/Feeds');

exports.loadAllFeeds = function (socket) {
    FeedModel.find()
        .sort('type')
        .exec(function (err, results) {
            socket.emit(constants.SOCKET.MESSAGE, results);
        });

};
