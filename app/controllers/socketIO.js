var fs = require('fs');

exports.incomingMessage = function (io, socket, data) {
    var messageType = data.type,
        messageHandlerPath, messageHandler;

    if(messageType) {
        messageHandlerPath = './messageHandlers/' + messageType + 'Handler.js';
        if(fs.existsSync(messageHandlerPath)) {
            messageHandler = require(messageHandlerPath);
            messageHandler.handleMessage(data);
            //emit new record to clients
        }
    } else {
        socket.emit('error',{'message': 'no message type was passed'})
    }
};

exports.outgoingMessage = function (io, data) {
    io.sockets.emit('message', data);
};
