'use strict';
describe('Feeds Controller', function () {
    var feeds, constants, rewire,
        feedsPath = '../../../app/controllers/feeds';

    before(function () {
        rewire = require('rewire');
        constants = require('../../../config/constants');
    });

    beforeEach(function () {
        feeds = rewire(feedsPath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(feedsPath)];
    });

    function getFeedsData() {
        var fs = require('fs');

        return JSON.parse(fs.readFileSync(__dirname + '/../../data/feeds.json'));
    }

    function cloneDataElements(data, numOfClones) {
        var i,
            newData = [];

        data.forEach(function (item) {
            for (i = 0; i < numOfClones; i++) {
                newData.push(item);
            }
        });

        return newData;
    }

    function getSpoofModelWithExecSpy(execSpy) {
        var spoofQuery = {
                sort: function () {
                    return this;
                },
                exec: execSpy
            },
            spoofModel = {
                find: sinon.spy(function () {
                    return spoofQuery;
                })
            }

        return spoofModel;
    }

    it('should not be undefined', function () {
        expect(feeds).to.be.ok;
    });

    describe('loadAllFeeds Function', function () {
        it('should access the database and get latest 20 records per type', function () {
            var data = getFeedsData().allFeeds,
                socketSpy = {emit: sinon.spy()},
                execSpy = sinon.spy(function (callback) {
                    callback(null, data);
                });

            data = cloneDataElements(data, 21);

            feeds.__set__('FeedModel', getSpoofModelWithExecSpy(execSpy));

            feeds.loadAllFeeds(socketSpy);

            expect(execSpy.called).to.be.ok;
            expect(socketSpy.emit.called).to.be.ok;
            expect(socketSpy.emit.args[0][1].length).to.equal(63);

        });
    });
});
