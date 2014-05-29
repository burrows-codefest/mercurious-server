/**
 * File: bintheknowFeed.js
 * User: bantingd
 * Date: 29/05/2014
 * Time: 16:31
 */
exports.getFeed = function(callback){
    var rss = require('parserss');
    rss('http://b-intheknow.com/rss', 10, callback);
};

