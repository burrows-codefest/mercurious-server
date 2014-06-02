var mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed');

exports.loadAllFeeds = function (socket) {
    FeedModel.find()
        .sort('type')
        .exec(function (err, results) {
            var type = '', itemCount, items = {};
            results.forEach(function (item) {
                if (item.type !== type) {
                    itemCount = 0;
                    type = item.type;
                    items[item.type] = [];
                }
                if (itemCount < 20 && type === item.type) {
                    items[type].push(item);
                    itemCount += 1;
                }
            });
            socket.emit('message', results);
        });

};
