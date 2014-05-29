'use strict';

angular.module('mercuriousApp')
    .directive('merTrafficStatus', function ($timeout, socket) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/traffic-status.html',
            link: function (scope) {
                socket.on('trafficStatus', function (data) {
                    scope.roads = data;
                });
            }
        };
    });