'use strict';
describe('SocketIO Controller', function () {
    var socketIO, constants, rewire,
        socketIOPath = '../../../app/controllers/socketIO',
        feedHandlerPath = '../../../app/controllers/messageHandlers/feedHandler';

    before(function () {
        rewire = require('rewire');
        constants = require('../../../config/constants');
    });

    beforeEach(function () {
        socketIO = require(socketIOPath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(socketIOPath)];
        delete require.cache[require.resolve(feedHandlerPath)];
    });

    it('should not be undefined', function () {
        expect(socketIO).to.be.ok;
    });

    describe('incomingMessage Function', function () {
        it('should send client to home page', function () {
            var feedHandler = rewire(feedHandlerPath),
                feedHandlerMock = sinon.spy(),
                socksMock = 'this is a socks mock',
                socketEmitSpy = sinon.spy();

            feedHandler.__set__(feedHandlerMock);

            socketIO.incomingMessage(socksMock, {emit: socketEmitSpy}, {type: 'feed'});

            expect(renderSpy.called).to.be.ok;
            expect(renderSpy.args[0][0]).to.equal(constants.TEMPLATE.INDEX);
        });

    });

});
