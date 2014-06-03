var home = require('../app/controllers/home'),
    socketIO = require('../app/controllers/socketIO'),
    traffic = require('../app/controllers/traffic'),
    user = require('../app/controllers/user'),
    admin = require('../app/controllers/admin'),
    feeds = require('../app/controllers/feeds');

module.exports = function (app, io) {
    app.get('/api/github', function (req, res) {
        io.sockets.emit('message', req.body);
        res.send('200');
    });
    app.get('/signin', user.loginPage);
    app.get('/admin',admin.index);
    app.get('/', home.index);

    app.post('/login',user.authenticate);

    io.sockets.on('connection', function (socket) {

        feeds.loadAllFeeds(socket);
        traffic.startTrafficStatus(io.sockets);

        socket.on('message', function (data) {
            socketIO.incomingMessage(io, socket, data);
        });
    });
};
