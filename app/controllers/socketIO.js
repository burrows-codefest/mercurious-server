var self = this,
    constants = require('../../config/constants');

exports.incomingMessage = function (io, socket, data) {
    var messageType = data.type,
        messageHandlerPath, messageHandler;

    if(messageType) {
        messageHandlerPath = './messageHandlers/' + messageType + 'Handler.js';

        messageHandler = require(messageHandlerPath);
        messageHandler.handleMessage(io, data);
    } else {
        socket.emit(constants.SOCKET.ERROR,{'message': 'no message type was passed'})
    }
};

exports.outgoingMessage = function (io, data) {
    io.to(constants.SOCKET.DEFAULT_CHANNEL).emit(constants.SOCKET.NEW_ITEM, data);
};

exports.startPingToClients = function (io) {
    setTimeout(function () {
        io.to(constants.SOCKET.DEFAULT_CHANNEL).emit(constants.SOCKET.PING);
        self.startPingToClients(io);
    }, 10000);
};
