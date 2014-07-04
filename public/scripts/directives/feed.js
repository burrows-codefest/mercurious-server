'use strict';

angular.module('mercuriousApp')
    .directive('merFeed', function () {
        return {
            restrict: 'E',
            scope: {
                'merFeed': '=',
                'merFilter': '=',
                'merLimit': '=',
                'merTitle': '='
            },
            templateUrl: '/scripts/directives/templates/feed.html',
            link: function (scope) {
                scope.limit = 20;
                if (scope.merLimit) {
                    scope.limit = scope.merLimit;
                }
            }
        };
    });
