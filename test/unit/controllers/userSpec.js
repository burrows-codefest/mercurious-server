'use strict';
describe('User Controller', function () {
    var user, constants, rewire,
        userPath = '../../../app/controllers/user';

    before(function () {
        rewire = require('rewire');
        constants = require('../../../config/constants');
    });

    beforeEach(function () {
        user = rewire(userPath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(userPath)];
    });

    it('should not be undefined', function () {
        expect(user).to.be.ok;
    });

    describe('authenticate Function', function () {

        function getSpoofModelWithExecSpy(execSpy) {
            var spoofQuery = {
                    sort: function () {
                        return this;
                    },
                    equals: function () {
                        return this;
                    },
                    where: function () {
                        return this;
                    },
                    exec: execSpy
                },
                spoofModel = {
                    find: sinon.spy(function () {
                        return spoofQuery;
                    })
                };

            return spoofModel;
        }

        it('should successfully auth the user', function () {
            var redirectSpy = sinon.spy(),
                sessionData = {user: false},
                execSpy = sinon.spy(function (callback) {
                    callback(null, [{username: 'jason', password: 'boo'}]);
                });

            user.__set__('UserModel', getSpoofModelWithExecSpy(execSpy));

            user.authenticate({body: {username: 'jason', password: 'boo'}, session: sessionData}, {redirect: redirectSpy});

            expect(redirectSpy.called).to.be.ok;
            expect(sessionData.user).to.be.ok;
            expect(redirectSpy.args[0][0]).to.equal(constants.PATH.ADMIN);
        });

        it('should not successfully auth the user', function () {
            var redirectSpy = sinon.spy(),
                sessionData = {user: false},
                execSpy = sinon.spy(function (callback) {
                    callback(null, []);
                });

            user.__set__('UserModel', getSpoofModelWithExecSpy(execSpy));

            user.authenticate({body: {username: 'jason', password: 'bad pass'}, session: sessionData}, {redirect: redirectSpy});

            expect(redirectSpy.called).to.be.ok;
            expect(sessionData.user).to.not.be.ok;
            expect(redirectSpy.args[0][0]).to.equal(constants.PATH.LOGIN);
        });

        it('should successfully show user is auth', function () {
            var redirectSpy = sinon.spy();

            user.isUserAuth({body: {username: 'jason', password: 'bad pass'}, session: {user: true}}, {}, redirectSpy);

            expect(redirectSpy.called).to.be.ok;
        });

        it('should not successfully show user is auth', function () {
            var redirectSpy = sinon.spy(),
                req = {send: redirectSpy, statusCode: ''};

            user.isUserAuth({body: {username: 'jason', password: 'bad pass'}, session: {user: false}}, req);

            expect(redirectSpy.called).to.be.ok;
            expect(req.statusCode).to.equal(401);
        });
    });
});
