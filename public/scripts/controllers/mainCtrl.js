'use strict';
angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket) {
        $scope.feed = [];

        socket.emit('message', {type: 'feed'});

        socket.on('message', function (data) {
            $scope.feed = data;
        });

        socket.on('vote', function (data) {
            for (var item in $scope.feed) {
                if ($scope.feed[item]._id && ($scope.feed[item]._id.indexOf(data.id) !== -1)) {
                    $scope.feed[item][data.type] = data.value;
                }
            }
        });

        socket.on('new item', function (data) {
            $scope.feed.push(data);
        });
        socket.on('ping', function () {
            socket.emit('pong');
        });
    });
