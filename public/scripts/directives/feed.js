'use strict';

angular.module('mercuriousApp')
    .directive('merFeed', function () {
        return {
            restrict: 'E',
            scope: {
                'merFeed': '=',
                'merFilter': '=',
                'merTitle': '='
            },
            templateUrl: '/scripts/directives/templates/feed.html'
        };
    });
