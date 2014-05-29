/**
 * File: bintheknowFeed.js
 * User: bantingd
 * Date: 29/05/2014
 * Time: 16:31
 */
var rss = require('parserss');
rss('http://b-intheknow.com/rss', 10, function (err, res) {
    console.log(err);
    console.log(res);
});
