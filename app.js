'use strict';

var db,
    express = require('express'),
    mongoose = require('mongoose'),
    fs = require('fs'),
    config = require('./config/config'),
    socketIO = require('./app/controllers/socketIO'),
    app = express(),
    server = require('http').Server(app),
    socks = require('socket.io')(server),
    servicesPath = __dirname + '/app/services';

mongoose.connect(config.db);
db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

require('./config/express')(app, config);
require('./config/routes')(app, socks);

socketIO.startPingToClients(socks);

fs.readdirSync(servicesPath).forEach(function (file) {
    var service;
    if (file.indexOf('.js') >= 0) {
        service = require(servicesPath + '/' + file);
        service.loadFeed(socks);
    }
});

server.listen(config.port);
console.log('Started Server on port ' + config.port);
