'use strict';

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket) {
        $scope.createMeme = false;

        socket.on('message', function (data) {
            $scope.feed = data;
        });
    });
