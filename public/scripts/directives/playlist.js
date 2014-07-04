'use strict';

angular.module('mercuriousApp')
    .directive('merPlaylist', function (socket) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/playlist.html',
            link: function (scope) {
                scope.playlistItems = [];

                socket.emit('getAllPlaylistItems', {type: 'playlist'});

                socket.on('getAllPlaylistItems', function (data) {
                    scope.pullRequests = data;
                });
            }
        };
    });
