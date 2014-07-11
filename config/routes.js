'use strict';

var home = require('../app/controllers/home'),
    socketIO = require('../app/controllers/socketIO'),
    traffic = require('../app/controllers/traffic'),
    user = require('../app/controllers/user'),
    github = require('../app/controllers/github'),
    playlist = require('../app/controllers/playlist'),
    tinysong = require('../app/controllers/tinysong'),
    admin = require('../app/controllers/admin'),
    feeds = require('../app/controllers/feeds'),
    mongoose = require('mongoose'),
    FeedsModel = mongoose.model('Feed'),

    constants = require('./constants');

module.exports = function (app, socks) {

    app.get('/api/song/*', tinysong.search);
    app.get('/signin', user.loginPage);
    app.get('/admin',admin.index);
    app.get('/', home.index);

    app.post('/login',user.authenticate);
    app.post('/api/github',github.incomingWebhook);

    app.post('/api/sendVote/:reqId', function(req, res) {
        var id = req.params.reqId;

        FeedsModel.findById(id, function(err, item) {
            var newTotal,
                obj = {},
                voteType = req.body.type;

            if (!item[voteType]) {
                item[voteType] = 0;
            }
            newTotal = item[voteType] + 1;

            obj[voteType] = newTotal;

            FeedsModel.findByIdAndUpdate(id, { $set: obj}, function () {
                var changedObj = {};
                changedObj.id = id;
                changedObj.type = voteType;
                changedObj.value = newTotal;

                socks.sockets.emit('vote', changedObj);
                res.json(item);
            });
        });
    });

    app.get('/api/getItem/:reqId', function(req, res) {
        FeedsModel.findById(req.params.reqId, function(err, item) {
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

        socket.on(constants.SOCKET.PLAYLIST_ADD_SONG, function (data) {
            playlist.addSongToPlaylist(socks, data);
        });
    });
};
