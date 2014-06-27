'use strict';
describe('Home Controller', function () {
    var home, constants,
        homePath = '../../../app/controllers/home';

    before(function () {
       constants = require('../../../config/constants');
    });

    beforeEach(function () {
        home = require(homePath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(homePath)];
    });

    it('should not be undefined', function () {
        expect(home).to.be.ok;
    });

    describe('index Function', function () {
        it('should send client to home page', function () {
            var renderSpy = sinon.spy();

            home.index({session: {user: true}}, {render: renderSpy});

            expect(renderSpy.called).to.be.ok;
            expect(renderSpy.args[0][0]).to.equal(constants.TEMPLATE.INDEX);
        });

    });

});
