'use strict';

var rss = require('parserss'),
    socketIO = require('../controllers/socketIO'),
    constants = require('../../config/constants'),
    FeedModel = require('../models/Feeds'),
    socks, self = this;

function feedIterator(array, index) {
    if (index && index >= array.length) {
        return;
    }

    if (!index) {
        index = 0;
    }

    FeedModel.find()
        .where('url').equals(array[index].link)
        .exec(function (err, feeds) {
            if (feeds.length === 0) {
                var date = new Date(array[index].pubdate),
                    record = {title: array[index].title, url: array[index].link,
                        text: array[index].description, type: 'b-intheknow', 'publishedDate': date},
                    dbRecord = new FeedModel(record);

                dbRecord.save();

                socketIO.outgoingMessage(socks, record);
            }
            index += 1;
            feedIterator(array, index);
        });
}

exports.loadFeed = function (socketIO) {
    socks = socketIO;
    this.getFeed();
};

exports.getFeed = function () {
    rss('http://b-intheknow.com/rss', 10, function (err, res) {
        feedIterator(res.articles);
    });
    setTimeout(self.getFeed, constants.TIMER.MINUTES_15);
};
