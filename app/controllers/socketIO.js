var constants = require('../../config/constants');

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

    io.sockets.emit(constants.SOCKET.NEW_ITEM, data);
};
