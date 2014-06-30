'use strict';

var socks,
    cachedAccessToken,
    self = this,
    OAuth = require('oauth'),
    https = require('https'),
    socketIO = require('../controllers/socketIO'),
    constants = require('../../config/constants'),
    FeedModel = require('../models/Feeds'),

    OAuth2 = OAuth.OAuth2,
    twitterConsumerKey = '2xBlAkskMzAxGun1IB3WNuk3d',
    twitterConsumerSecret = 'Tu1PYdVPLdbQ6hXVUHy0JzRSL5mLntF9jbPmC4oLpkNxDrMDKk',
    oauth2 = new OAuth2(twitterConsumerKey, twitterConsumerSecret, 'https://api.twitter.com/', null, 'oauth2/token',
        null);

function getDataFeed(feed) {
    feed.forEach(function (item) {

        FeedModel.find({'twitterId': item.id}, function (err, feeds) {
            if (feeds.length === 0) {
                var dateTranslate = 'created_at',
                    date = new Date(item[dateTranslate]),
                    record = {twitterId: item.id, title: 'Mega Hero Squad', text: item.text,
                        type: 'twitter', 'publishedDate': date},
                    dbRecord = new FeedModel(record);

                dbRecord.save();
                socketIO.outgoingMessage(socks, record);
            }
        });

    });
}

exports.loadFeed = function (socketIO) {
    var self = this;

    socks = socketIO;

    oauth2.getOAuthAccessToken('', {'grant_type': 'client_credentials'}, function (e, accessToken) {
        cachedAccessToken = accessToken;
        self.getFeed();
    });

};

exports.getFeed = function () {
    var options = {
        hostname: 'api.twitter.com',
        path: '/1.1/statuses/user_timeline.json?screen_name=megaherosquad',
        headers: {
            Authorization: 'Bearer ' + cachedAccessToken
        }
    };
    https.get(options, function (result) {
        var tweets = '';
        result.setEncoding('utf8');
        result.on('data', function (data) {
            tweets += data;
        });

        result.on('end', function () {
            getDataFeed(JSON.parse(tweets));
        });
    });

    setTimeout(self.getFeed, constants.TIMER.MINUTES_15);
};
