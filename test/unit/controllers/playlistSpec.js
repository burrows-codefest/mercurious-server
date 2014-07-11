'use strict';
describe('Playlist Controller', function () {
    var playlist, constants, rewire,
        playlistPath = '../../../app/controllers/playlist';

    before(function () {
       rewire = require('rewire');
       constants = require('../../../config/constants');
    });

    beforeEach(function () {
        playlist = rewire(playlistPath);
    });

    afterEach(function () {
        delete require.cache[require.resolve(playlistPath)];
    });

    it('should not be undefined', function () {
        expect(playlist).to.be.ok;
    });

    describe('getAllPlaylistItems Function', function () {
        it('should display current playlist', function () {
            var socketSpy = {
                emit: sinon.spy()
                },
                mockServiceResult = 'this is the model result',
                mockService = {
                    getAllRecords: sinon.spy(function (callback) {
                        callback(mockServiceResult)
                    })
                };

            playlist.__set__('playlistService', mockService);

            playlist.getAllPlaylistItems(socketSpy);

            expect(socketSpy.emit.called).to.be.ok;
            expect(socketSpy.emit.args[0][0]).to.equal(constants.SOCKET.PLAYLIST_ALL);
            expect(socketSpy.emit.args[0][1]).to.equal(mockServiceResult);
        });
    });

    describe('addSongToPlaylist Function', function () {
        it('should not be undefined', function () {
            expect(playlist.addSongToPlaylist).to.be.ok;
        });

        it('should add song to the current playlist', function () {
            var socketSpy = {
                    emit: sinon.spy()
                },
                mockServiceResult = 'this is the new song',
                mockService = {
                    addRecord: sinon.spy(function (song, callback) {
                        callback(mockServiceResult)
                    })
                };

            playlist.__set__('playlistService', mockService);

            playlist.addSongToPlaylist(socketSpy, socketSpy);

            expect(socketSpy.emit.called).to.be.ok;
            expect(socketSpy.emit.args[0][0]).to.equal(constants.SOCKET.PLAYLIST_ADD_SONG);
            expect(socketSpy.emit.args[0][1]).to.equal(mockServiceResult);
        });
    });
});
