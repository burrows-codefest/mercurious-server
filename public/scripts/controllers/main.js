'use strict';
angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket, dbService) {
        $scope.createMeme = false;
        $scope.feed = [];

        socket.emit('message', {type: 'feed'});

        socket.on('message', function (data) {
            $scope.feed = data;
        });

        socket.on('vote', function (data) {
            var feed = $scope.feed;

            for (var item in feed) {
                if (feed[item]._id && (feed[item]._id.indexOf(data.id) !== -1)) {
                    feed[item][data.type] = data.value;
                }
            }

            $scope.feed = feed;
        });

        socket.on('new item', function (data) {
            $scope.feed.push(data);
        });
        socket.on('ping', function () {
            socket.emit('pong');
        });

        $scope.sendVote = function(memeId, action) {
            dbService.sendVote(memeId, action);
        };
    });
