var fs = require('fs');

exports.incomingMessage = function (io, socket, data) {
    var messageType = data.type,
        messageHandlerPath, messageHandler;

    if(messageType) {
        messageHandlerPath = './messageHandlers/' + messageType + 'Handler.js';

        messageHandler = require(messageHandlerPath);
        messageHandler.handleMessage(data);

        io.sockets.emit('new item', data);

    } else {
        socket.emit('error',{'message': 'no message type was passed'})
    }
};

exports.outgoingMessage = function (io, data) {
    io.sockets.emit('message', data);
};
