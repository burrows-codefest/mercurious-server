'use strict';

angular.module('mercuriousApp')
    .directive('merTrafficWarning', function ($timeout, socket) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/traffic-warning.html',
            link: function (scope) {
                socket.on('trafficWarning', function (data) {
                    console.log(data);

                    scope.warning = 'Traffic Update';

                    scope.showWarning = true;

                    $timeout(function () {
                        scope.showWarning = false;
                    }, 3000);
                });
            }
        };
    });