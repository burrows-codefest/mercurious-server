'use strict';
describe('Admin Controller', function () {
    var admin, constants,
        adminPath = '../../../app/controllers/admin';

    before(function () {
       constants = require('../../../config/constants');
    });

    beforeEach(function () {
        admin = require(adminPath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(adminPath)];
    });

    it('should not be undefined', function () {
        expect(admin).to.be.ok;
    });

    describe('index Function', function () {
        it('should send client to admin page becuase they are authed', function () {
            var renderSpy = sinon.spy();

            admin.index({session: {user: true}}, {render: renderSpy});

            expect(renderSpy.called).to.be.ok;
            expect(renderSpy.args[0][0]).to.equal(constants.TEMPLATE.USER);
        });

        it('should send client to login page becuase they are not authed', function () {
            var renderSpy = sinon.spy();

            admin.index({session: {user: false}}, {render: renderSpy});

            expect(renderSpy.called).to.be.ok;
            expect(renderSpy.args[0][0]).to.equal(constants.TEMPLATE.LOGIN);
        });
    });

});
