'use strict';

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket, dataSourceService, rssFeedService) {

        $scope.newValue = 'edit socket';

        socket.on('that', function (data) {
            $scope.test = data;
        });

        $scope.editSocket = function() {
            socket.emit('that', $scope.newValue);
            console.log($scope.newValue);
        };

        dataSourceService.getSources().forEach(function(feed) {
            rssFeedService.getFeed(feed.url).then(function (res) {
                $scope.feed = res.responseData.feed.entries;
            });
        });
    });
