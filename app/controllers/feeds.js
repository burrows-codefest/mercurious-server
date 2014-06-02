var mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed');

exports.loadAllFeeds = function (socket) {
    FeedModel.find()
        .sort('-date')
        .limit('20')
        .exec(function (err, results) {
            socket.emit('message', results);
        });

};
