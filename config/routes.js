'use strict';

var home = require('../app/controllers/home'),
    socketIO = require('../app/controllers/socketIO'),
    traffic = require('../app/controllers/traffic'),
    meme = require('../app/controllers/meme'),
    user = require('../app/controllers/user'),
    github = require('../app/controllers/github'),
    admin = require('../app/controllers/admin'),
    feeds = require('../app/controllers/feeds'),
    mongoose = require('mongoose'),
    FeedsModel = mongoose.model('Feed'),

    constants = require('./constants');

module.exports = function (app, socks) {

    app.get('/signin', user.loginPage);
    app.post('/login', user.authenticate);

    app.get('/admin', admin.index);
    app.get('/', home.index);

    app.get('/register', user.registerPage);
    app.post('/register', user.registerSubmit);

    app.post('/api/github', github.incomingWebhook);

    app.post('/api/sendVote/:reqId', user.isUserAuth, function(req, res) {
        meme.updateVote(socks, req, res);
    });

    app.get('/api/getItem/:reqId', user.isUserAuth, function (req, res) {
        FeedsModel.findById(req.params.reqId, function (err, item) {
            if (err) {
                res.send(err);
            }
            res.json(item);
        });
    });

    socks.sockets.on('connection', function (socket) {

        socket.join(constants.SOCKET.DEFAULT_CHANNEL);

        feeds.loadAllFeeds(socket);
        traffic.startTrafficStatus(socks.sockets);

        socket.on(constants.SOCKET.MESSAGE, function (data) {
            socketIO.incomingMessage(socks, socket, data);
        });

        socket.on(constants.SOCKET.PING_RETURN, function () {});

        socket.on(constants.SOCKET.GITHUB_ALL_PR, function () {
            github.getAllRequests(socket);
        });
    });
};
