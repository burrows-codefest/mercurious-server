var home = require('../app/controllers/home'),
    socketIO = require('../app/controllers/socketIO'),
    traffic = require('../app/controllers/traffic'),
    user = require('../app/controllers/user'),
    github = require('../app/controllers/github'),
    admin = require('../app/controllers/admin'),
    feeds = require('../app/controllers/feeds');

module.exports = function (app, io) {
    app.get('/signin', user.loginPage);
    app.get('/admin',admin.index);
    app.get('/', home.index);

    app.post('/login',user.authenticate);
    app.post('/api/github',github.incomingWebhook);

    io.sockets.on('connection', function (socket) {

        feeds.loadAllFeeds(socket);
        traffic.startTrafficStatus(io.sockets);

        socket.on('message', function (data) {
            socketIO.incomingMessage(io, socket, data);
        });
    });
};
