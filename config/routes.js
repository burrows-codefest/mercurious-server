var home = require('../app/controllers/home'),
    socketIO = require('../app/controllers/socketIO'),
    feeds = require('../app/controllers/feeds');

module.exports = function (app, io) {
    app.get('/api/github', function (req, res) {
        io.sockets.emit('message', req.body);
        res.send('200');
    });

    app.get('/', home.index);

    function startTrafficStatus(sockets) {
        function getRandomStatus() {
            return Math.floor(Math.random() * 2);
        }

        function getStatus(index) {
            var status = [
                'good',
                'accident'
            ];

            return status[index];
        }

        function getNewRoadStatus(id, status) {
            return {
                id: id,
                status: status
            }
        }

        setInterval(function () {
            sockets.emit('trafficStatus', {
                'A12': getNewRoadStatus('A12', getStatus(getRandomStatus())),
                'A13': getNewRoadStatus('A13', getStatus(getRandomStatus())),
                'M11': getNewRoadStatus('M11', getStatus(getRandomStatus())),
                'A130': getNewRoadStatus('A130', getStatus(getRandomStatus())),
                'M25': getNewRoadStatus('M25', getStatus(getRandomStatus()))
            });
        }, 10000);
    }

    io.sockets.on('connection', function (socket) {
        feeds.loadAllFeeds(socket);
        socket.on('message', function (data) {
            socketIO.incomingMessage(io, socket, data);
        });

        startTrafficStatus(io.sockets);
    });
};
