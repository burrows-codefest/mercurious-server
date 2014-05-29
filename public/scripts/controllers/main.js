'use strict';

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket, dataSourceService, rssFeedService) {

        $scope.newValue = 'edit socket';

        socket.on('message', function (data) {
            console.log(data);
            $scope.test = data;
        });

        $scope.editSocket = function() {
            socket.emit('message', $scope.newValue);
        };

        dataSourceService.getSources().forEach(function(feed) {
            rssFeedService.getFeed(feed.url).then(function (res) {
                $scope.feed = res.responseData.feed.entries;
            });
        });
    });
