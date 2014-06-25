'use strict';

var feeds = require('../feeds');

exports.handleMessage = function (io, socket) {
    feeds.loadAllFeeds(socket);
};
