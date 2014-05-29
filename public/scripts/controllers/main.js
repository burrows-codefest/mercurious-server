'use strict';

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, dataSourceService, rssFeedService) {
        var feedSources = dataSourceService.getSources();

        feedSources.forEach(function(feed) {
            rssFeedService.getFeed(feed.url).then(function (res) {
                $scope.feed = res.responseData.feed.entries;
            });
        });
    });
