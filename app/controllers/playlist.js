'use strict';

var constants = require('../../config/constants'),
    playlistService = require('../services/Playlist');

exports.getAllPlaylistItems = function (socket) {
    playlistService.getAllRecords(function (playlistItems) {
        socket.emit(constants.SOCKET.PLAYLIST_ALL, playlistItems);
    });
};

exports.addSongToPlaylist = function (socks, song) {
    playlistService.addRecord(song, function (newSong) {
        socks.emit(constants.SOCKET.PLAYLIST_ADD_SONG, newSong);
    });
};