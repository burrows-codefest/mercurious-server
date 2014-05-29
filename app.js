var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    config = require('./config/config');
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(modelsPath + '/' + file);
    }
});

var app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

require('./config/express')(app, config);
require('./config/routes')(app, io);


require('./app/services/twitterOauthFeed.js');
require('./app/services/bintheknowFeed.js');


//load default value
var ArticlesModel = mongoose.model('Article');
var firstRecord = new ArticlesModel({
    title: 'article 1',
    url: 'http://localhost',
    text: 'this is an article'
});

firstRecord.save();


server.listen(config.port);
console.log('Started Server on port ' + config.port);
