var OAuth = require('oauth'),
    https = require('https'),
    mongoose = require('mongoose'),
    FeedModel = mongoose.model('Feed'),
    io,

    OAuth2 = OAuth.OAuth2,
    twitterConsumerKey = '2xBlAkskMzAxGun1IB3WNuk3d',
    twitterConsumerSecret = 'Tu1PYdVPLdbQ6hXVUHy0JzRSL5mLntF9jbPmC4oLpkNxDrMDKk',
    cached_access_token,

    oauth2 = new OAuth2(twitterConsumerKey, twitterConsumerSecret, 'https://api.twitter.com/', null, 'oauth2/token',
        null);

exports.loadFeed = function (socketIO) {
    var self = this;

    io = socketIO;

    oauth2.getOAuthAccessToken('', {'grant_type': 'client_credentials'}, function (e, access_token) {
        cached_access_token = access_token;
        self.getFeed();
    });

};

exports.getFeed = function () {
    var options = {
        hostname: 'api.twitter.com',
        path: '/1.1/statuses/user_timeline.json?screen_name=megaherosquad',
        headers: {
            Authorization: 'Bearer ' + cached_access_token
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
};

function getDataFeed(feed) {
    feed.forEach(function (item) {
        FeedModel.find({'twitterId': item.id}, function (err, feeds) {
            if(feeds.length === 0) {
                var record = new FeedModel({
                twitterId: item.id,
                title: 'Mega Hero Squad',
                text: item.text
            });
                record.save();
            }
        });

    });
}