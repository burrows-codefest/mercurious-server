'use strict';
describe('Admin Controller', function () {
    var song, constants, rewire,
        events,
        songPath = '../../../app/controllers/tinysong';

    before(function () {
        events = require('events');
        rewire = require('rewire');
        constants = require('../../../config/constants');
    });

    beforeEach(function () {
        song = rewire(songPath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(songPath)];
    });

    it('should not be undefined', function () {
        expect(song).to.be.ok;
    });

    describe('search Function', function () {
        it('should not be undefined', function () {
            expect(song.search).to.be.ok;
        });

        it('should send back a JSON Object of matching songs', function () {
            var httpMock,
                MockResponse = function () {
                    events.EventEmitter.call(this);

                    this.setEncoding = sinon.spy();
                },
                jsonResult = JSON.stringify({
                    "SongName": "one hit wonder"
                }),
                jsonSpy = sinon.spy();

            MockResponse.prototype = events.EventEmitter.prototype;

            httpMock = {
                setEncoding: sinon.spy(),
                get: sinon.spy(function (url, callback) {
                    var res = new MockResponse();
                    callback(res);
                    res.emit('data', jsonResult);
                    res.emit('end');
                })
            };

            song.__set__('http', httpMock);

            song.search({url: ''}, {json: jsonSpy});

            expect(jsonSpy.called).to.be.ok;
            expect(jsonSpy.args[0][0].SongName).to.equal('one hit wonder');
        });
    });

});
