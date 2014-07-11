'use strict';

function setupSocketListeners(scope, socket) {
    socket.on('getAllPlaylistItems', function (data) {
        scope.pullRequests = data;
    });

    socket.on('addSong', function (data) {
        scope.playlistItems.push(data);
    });
}

angular.module('mercuriousApp')
    .directive('merPlaylist', function (socket, tinysongService) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/playlist.html',
            link: function (scope) {
                scope.playlistItems = [];
                scope.searchResults = [];
                scope.searchText = '';

                setupSocketListeners(scope, socket);

                scope.getSongsBasedOnText = function () {
                    tinysongService.getSongs(scope.searchText).then(function (data) {
                        scope.searchResults = data;
                    });
                };

                scope.addSong = function (song) {
                    socket.emit('addSong', song);
                };
            }
        };
    });
