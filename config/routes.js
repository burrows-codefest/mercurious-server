module.exports = function(app, io){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);


    //socket IO
    var socketIO = require('../app/controllers/socketIO');
    io.sockets.on('connection', function (socket) {
        console.log('a user connected');

        socket.emit('that', 'this is a linked emit');

        socket.on('private message', function (from, msg) {
            console.log('I received a private message by ', from, ' saying ', msg);
        });

        socket.on('disconnect', function () {
            console.log('a user disconnected');
        });
    });

};
