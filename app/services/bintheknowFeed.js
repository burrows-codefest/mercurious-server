var rss = require('parserss'),
    mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed'),
    socketIO = require('../controllers/socketIO'),
    io;

exports.loadFeed = function (socketIO) {
    io = socketIO;
    this.getFeed();
};

exports.getFeed = function () {
    //this function is running twice for some unknown reason
    rss('http://b-intheknow.com/rss', 10, function (err, res) {
        res.articles.forEach(function (item) {
            FeedModel.find()
                .where('url').equals(item.link)
                .exec(function (err, feeds) {
                    if (feeds.length === 0) {
                        var record = {title: item.title, url: item.link, text: item.description},
                            dbRecord = new FeedModel(record);

                        dbRecord.save();

                        socketIO.outgoingMessage(io, record);
                    }
                });
        });
    });
    //setTimeout(this.getFeed, 60000);
};
