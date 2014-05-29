module.exports = function(app, io){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

    function trafficWarningEngine(sockets) {
        setInterval(function () {
            sockets.emit('trafficWarning', 'Traffic Problem');
        }, 10000);
    }

    //socket IO
    io.sockets.on('connection', function (socket) {
        socket.on('message', function (data) {
            io.sockets.emit('message', data);
        });

        trafficWarningEngine(io.sockets);
    });

};
