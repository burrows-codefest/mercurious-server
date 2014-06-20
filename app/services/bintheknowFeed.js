var rss = require('parserss'),
    mongoose = require('mongoose'),
    socketIO = require('../controllers/socketIO'),
    constants = require('../../config/constants'),
    FeedModel = mongoose.model(constants.MODEL.FEED),
    io, self = this;

exports.loadFeed = function (socketIO) {
    io = socketIO;
    this.getFeed();
};

exports.getFeed = function () {
    rss('http://b-intheknow.com/rss', 10, function (err, res) {
        res.articles.forEach(function (item) {
            FeedModel.find()
                .where('url').equals(item.link)
                .exec(function (err, feeds) {
                    if (feeds.length === 0) {
                        var date = new Date(item.pubdate),
                            record = {title: item.title, url: item.link,
                                text: item.description, type: 'b-intheknow', 'publishedDate': date},
                            dbRecord = new FeedModel(record);

                        dbRecord.save();

                        socketIO.outgoingMessage(io, record);
                    }
                });
        });
    });
    setTimeout(self.getFeed, constants.TIMER.MINUTES_15);
};
