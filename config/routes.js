var home = require('../app/controllers/home'),
    socketIO = require('../app/controllers/socketIO'),
    traffic = require('../app/controllers/traffic'),
    user = require('../app/controllers/user'),
    github = require('../app/controllers/github'),
    admin = require('../app/controllers/admin'),
    feeds = require('../app/controllers/feeds'),
    mongoose = require('mongoose'),
    FeedsModel = mongoose.model('Feed'),

    constants = require('./constants');

var userCount = 0;

module.exports = function (app, io) {

    app.get('/signin', user.loginPage);
    app.get('/admin',admin.index);
    app.get('/', home.index);

    app.post('/login',user.authenticate);
    app.post('/api/github',github.incomingWebhook);

    app.get('/api/getItem/:reqId', function(req, res) {
        FeedsModel.findById(req.params.reqId, function(err, item) {
            if (err) {
                res.send(err)
            }
            res.json(item);
        });
    });


    io.sockets.on('connection', function (socket) {
        userCount++;
        console.log('user connects: ' + userCount);

        socket.on('disconnect', function () {
            userCount--;
            console.log('user disconnects: ' + userCount);
        });

        socket.join(constants.SOCKET.DEFAULT_CHANNEL);

        feeds.loadAllFeeds(socket);
        traffic.startTrafficStatus(io.sockets);

        socket.on(constants.SOCKET.MESSAGE, function (data) {
            socketIO.incomingMessage(io, socket, data);
        });
        socket.on(constants.SOCKET.PING_RETURN, function () {});
    });
};
