'use strict';
describe('Github Controller', function () {
    var github, constants, rewire,
        githubPath = '../../../app/controllers/github';

    before(function () {
        rewire = require('rewire');
        constants = require('../../../config/constants');
    });

    beforeEach(function () {
        github = rewire(githubPath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(githubPath)];
    });

    function getGithubData() {
        var fs = require('fs');

        return JSON.parse(fs.readFileSync(__dirname + '/../../data/github.json'));
    }

    it('should not be undefined', function () {
        expect(github).to.be.ok;
    });

    describe('incomingWebhook Function', function () {
        it('should receive a new pull request hook', function () {
            var data = getGithubData().pullRequestOpen,
                headers = {},
                sendSpy = sinon.spy(),
                githubServiceSpy = {
                    addRecord: sinon.spy()
                };

            github.__set__('githubService', githubServiceSpy);
            headers[constants.GITHUB.EVENT_HEADER] = constants.GITHUB.EVENTS.PULL_REQUEST;

            github.incomingWebhook({
                body: data,
                headers: headers
            }, {send: sendSpy});

            expect(sendSpy.called).to.be.ok;
            expect(githubServiceSpy.addRecord.called).to.be.ok;
        });

        it('should receive a existing pull request hook', function () {
            var data = getGithubData().pullRequestOpen,
                headers = {},
                sendSpy = sinon.spy(),
                githubServiceSpy = {
                    updateRecord: sinon.spy()
                };

            github.__set__('githubService', githubServiceSpy);
            headers[constants.GITHUB.EVENT_HEADER] = constants.GITHUB.EVENTS.PULL_REQUEST;

            data.action = constants.GITHUB.ACTIONS.CLOSE;

            github.incomingWebhook({
                body: data,
                headers: headers
            }, {send: sendSpy});

            expect(sendSpy.called).to.be.ok;
            expect(githubServiceSpy.updateRecord.called).to.be.ok;
        });
    });

    describe('getLatestRequests Function', function () {
        it('should not be undefined', function () {
            expect(github.getLatestRequests).to.be.ok;
        });
    });
});
