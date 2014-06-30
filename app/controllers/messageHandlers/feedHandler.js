'use strict';

var feeds = require('../feeds');

exports.handleMessage = function (socket) {
    feeds.loadAllFeeds(socket);
};
