var express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    config = require('./config/config'),
    socketIO = require('./app/controllers/socketIO');
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

socketIO.startPingToClients(io);

var servicesPath = __dirname + '/app/services';
fs.readdirSync(servicesPath).forEach(function (file) {
    var service;
    if (file.indexOf('.js') >= 0) {
        service = require(servicesPath + '/' + file);
        service.loadFeed(io);
    }
});


var UserModel = mongoose.model('Feed');

UserModel.find().exec(function (err, results) {
    results.forEach(function (record) {

        record.publishedDate = new Date(Number(record.publishedDate));

        var dbRecord = new UserModel(record);
        dbRecord.save();
    });

});


server.listen(config.port);
console.log('Started Server on port ' + config.port);
