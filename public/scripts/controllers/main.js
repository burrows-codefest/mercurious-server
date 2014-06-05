'use strict';

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket) {
        $scope.createMeme = false;
        $scope.feed = [];

        socket.on('message', function (data) {
            $scope.feed = data;
        });

        socket.on('new item', function (data) {
            $scope.feed.push(data);
        });
    });
