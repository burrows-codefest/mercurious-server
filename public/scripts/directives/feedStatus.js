'use strict';

angular.module('mercuriousApp')
    .directive('merFeedStatus', function (dataSourceService) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/feed-status.html',
            link: function (scope) {
                scope.feeds = dataSourceService.getSources();
            }
        };
    });