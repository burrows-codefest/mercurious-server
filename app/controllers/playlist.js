'use strict';

var constants = require('../../config/constants'),
    playlistService = require('../services/Playlist');

exports.getAllPlaylistItems = function (socket) {
    playlistService.getAllRecords(function (playlistItems) {
        socket.emit(constants.SOCKET.PLAYLIST_ALL, playlistItems);
    });
};
