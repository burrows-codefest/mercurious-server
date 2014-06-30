'use strict';

var self = this,
    constants = require('../../config/constants');

exports.incomingMessage = function (socks, socket, data) {
    var messageType = data.type,
        messageHandlerPath, messageHandler;

    if(messageType) {
        messageHandlerPath = './messageHandlers/' + messageType + 'Handler.js';

        messageHandler = require(messageHandlerPath);
        messageHandler.handleMessage(socks, socket, data);
    } else {
        socket.emit(constants.SOCKET.ERROR,{'message': 'no message type was passed'});
    }
};

exports.outgoingMessage = function (socks, data) {
    socks.to(constants.SOCKET.DEFAULT_CHANNEL).emit(constants.SOCKET.NEW_ITEM, data);
};

exports.startPingToClients = function (socks) {
    setTimeout(function () {
        socks.to(constants.SOCKET.DEFAULT_CHANNEL).emit(constants.SOCKET.PING);
        self.startPingToClients(socks);
    }, 10000);
};
