var rss = require('parserss'),
    mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed');

exports.loadFeed = function () {
    //this.getFeed();
};

exports.getFeed = function () {
    var cleansedResult = [];
    //this function is running twice for some unknown reason
    rss('http://b-intheknow.com/rss', 10, function (err, res) {
        res.articles.forEach(function (item) {
            FeedModel.find({'url': item.link}), function (err, feeds) {
                if(feeds.length === 0) {
                    cleansedResult.push(item);
                }
            }
        });
    });
    console.log(cleansedResult);
    //setTimeout(this.getFeed, 60000);
};
/*
var record = new FeedModel({
    title: item.title,
    url: item.link,
    text: item.description
});

record.save();*/
