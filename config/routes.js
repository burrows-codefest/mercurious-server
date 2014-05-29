module.exports = function (app, io) {

    //home route
    var home = require('../app/controllers/home');
    app.get('/', home.index);

    function trafficWarningEngine(sockets) {
        function getNewRoadStatus(id, status) {
            return {
                id: id,
                status: status
            }
        }

        setInterval(function () {
            sockets.emit('trafficWarning', {
                roads: {
                    'A12': getNewRoadStatus('A12', 0),
                    'A13': getNewRoadStatus('A12', 0),
                    'M11': getNewRoadStatus('A12', 0),
                    'A130': getNewRoadStatus('A12', 0),
                    'M25': getNewRoadStatus('A12', 0)
                }
            });
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
