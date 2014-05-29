var twitterFeed = require('./twitterOauthFeed.js');
var bintheknowFeed = require('./bintheknowFeed.js');

var _ = require('lodash-node');

var bFeed, tFeed;
function getBintheknowFeed(callback){
    bintheknowFeed.getFeed(function(err, res){
        bFeed = res;
        callback(bFeed);
    });
}

function getTwitterFeed(callback){
    twitterFeed.getFeed(function(res){
        tFeed = res;
        callback(tFeed);
    });
}

function collateFeeds() {
//    getBintheknowFeed(function(res){
//    });
    getTwitterFeed(function(res){
            console.log(Object.keys(res[0]));
//        _.forIn(res, function(value, key) {
//            console.log(value, key);
//        });
    });
}
collateFeeds();