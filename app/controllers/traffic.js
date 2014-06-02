exports.startTrafficStatus = function (sockets) {
    setInterval(function () {
        sockets.emit('trafficStatus', {
            'A12': getNewRoadStatus('A12', getStatus(getRandomStatus())),
            'A13': getNewRoadStatus('A13', getStatus(getRandomStatus())),
            'M11': getNewRoadStatus('M11', getStatus(getRandomStatus())),
            'A130': getNewRoadStatus('A130', getStatus(getRandomStatus())),
            'M25': getNewRoadStatus('M25', getStatus(getRandomStatus()))
        });
    }, 10000);
};

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
