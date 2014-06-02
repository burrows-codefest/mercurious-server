var home = require('../app/controllers/home'),
    socketIO = require('../app/controllers/socketIO'),
    traffic = require('../app/controllers/traffic'),
    feeds = require('../app/controllers/feeds');

module.exports = function (app, io) {
    app.get('/api/github', function (req, res) {
        io.sockets.emit('message', req.body);
        res.send('200');
    });

    app.get('/', home.index);

    app.get('/login', function (req, res) {
       var user = require('../apps/controller/user'),
           username = req.body.user,
           password = req.body.pass;

        user.authenticate(username, password, function (isUser) {
           if(isUser) {
               req.session.user = isUser;
               res.redirect('/user');
           } else {
               res.redirect('/');
           }
        });

    });

    io.sockets.on('connection', function (socket) {

        feeds.loadAllFeeds(socket);
        traffic.startTrafficStatus(io.sockets);

        socket.on('message', function (data) {
            socketIO.incomingMessage(io, socket, data);
        });
    });
};
