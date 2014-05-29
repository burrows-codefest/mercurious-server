module.exports = function (app) {
    var server = require('http').Server(app),
        io = require('socket.io')(server);
    console.log('io test');

    io.on('connection', function () {
        console.log('a user connected');
    });

    return server;
};