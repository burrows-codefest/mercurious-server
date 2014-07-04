'use strict';

angular.module('mercuriousApp')
    .directive('merFeed', function () {
        return {
            restrict: 'E',
            scope: {
                'merFeed': '=',
                'merFilter': '='
            },
            templateUrl: '/scripts/directives/templates/feed.html'
        };
    });
