'use strict';
describe('SocketIO Controller', function () {
    var socketIO, constants, rewire,
        socketIOPath = '../../../app/controllers/socketIO';

    before(function () {
        rewire = require('rewire');
        constants = require('../../../config/constants');
    });

    beforeEach(function () {
        socketIO = require(socketIOPath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(socketIOPath)];
    });

    it('should not be undefined', function () {
        expect(socketIO).to.be.ok;
    });

    describe('incomingMessage Function', function () {
        it('should find the feed handler and send data to the handleMessage function ', function () {
            var feedHandlerPath = '../../../app/controllers/messageHandlers/feedHandler',
                feedHandler = require(feedHandlerPath),
                socksMock = 'this is a socks mock',
                socketEmitSpy = sinon.spy();

            feedHandler.handleMessage = sinon.spy();

            socketIO.incomingMessage(socksMock, {emit: socketEmitSpy}, {type: 'feed'});

            expect(feedHandler.handleMessage.called).to.be.ok;
            expect(feedHandler.handleMessage.args[0][0]).to.equal(socksMock);

            delete require.cache[require.resolve(feedHandlerPath)];
        });

        it('has no message type passed', function () {
            var socketEmitSpy = sinon.spy();

            socketIO.incomingMessage('', {emit: socketEmitSpy}, {});

            expect(socketEmitSpy.called).to.be.ok;
            expect(socketEmitSpy.args[0][0]).to.equal(constants.SOCKET.ERROR);
        });

    });

    describe('outgoingMessage Function', function () {

        function getSocksMock () {
            return {
                to: sinon.spy(function () { return this;}),
                emit: sinon.spy()
            }
        }

        it('should emit a global message to all connected users ', function () {
            var socksMock = getSocksMock();

            socketIO.outgoingMessage(socksMock, {type: 'feed'});

            expect(socksMock.to.called).to.be.ok;
            expect(socksMock.emit.called).to.be.ok;
            expect(socksMock.emit.args[0][0]).to.equal(constants.SOCKET.NEW_ITEM);
        });
    });

    describe('startPingToClients Function', function () {

        var clock;

        beforeEach(function () {
            clock = sinon.useFakeTimers();
        });

        afterEach(function () {
            clock.restore();
        });

        function getSocksMock () {
            return {
                to: sinon.spy(function () { return this;}),
                emit: sinon.spy()
            }
        }

        it('should ping the client every 10 seconds ', function () {
            var socksMock = getSocksMock();

            socketIO.startPingToClients(socksMock);
            expect(socksMock.emit.called).to.not.be.ok;

            socketIO.startPingToClients = sinon.spy();

            clock.tick(10010);

            expect(socksMock.to.called).to.be.ok;
            expect(socksMock.emit.called).to.be.ok;
            expect(socketIO.startPingToClients.called).to.be.ok;
        });
    });
});
