module.exports = function(app, io){

    //Github Webhook
    app.get('/api/github', function (req, res) {
        io.sockets.on('message', req.body);
        res.send('200');
    });

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);

    //socket IO
    io.sockets.on('connection', function (socket) {
        socket.on('message', function (data) {
            io.sockets.emit('message', data);
        });
    });

};
