var rss = require('parserss'),
    mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed'),
    socketIO = require('../controllers/socketIO'),
    io, self = this;

exports.loadFeed = function (socketIO) {
    io = socketIO;
    this.getFeed();
};

exports.getFeed = function () {
    //this function is running twice due to bug in module
    rss('http://b-intheknow.com/rss', 10, function (err, res) {
        res.articles.forEach(function (item) {
            FeedModel.find()
                .where('url').equals(item.link)
                .exec(function (err, feeds) {
                    if (feeds.length === 0) {
                        var record = {title: item.title, url: item.link, text: item.description, type: 'b-intheknow'},
                            dbRecord = new FeedModel(record);

                        dbRecord.save();

                        socketIO.outgoingMessage(io, record);
                    }
                });
        });
    });
    setTimeout(self.getFeed,(1000*60*15));
};
