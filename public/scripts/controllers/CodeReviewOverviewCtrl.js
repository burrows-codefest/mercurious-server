'use strict';
angular.module('mercuriousApp')
    .controller('CodeReviewOverviewCtrl', function ($scope, socket) {
        $scope.pullRequests = [];

        socket.emit('githubAllPullRequest', {});

        socket.on('githubAllPullRequest', function (data) {
            $scope.pullRequests = data;
        });

        socket.on('githubNewPullRequest', function(data) {
            $scope.pullRequests.push(data);
        });

        socket.on('githubUpdatedPullRequest', function(data) {
            $scope.pullRequests.push(data);
        });

    });
