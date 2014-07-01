'use strict';
angular.module('mercuriousApp')
    .controller('CodeReviewOverviewCtrl', function ($scope, socket, githubService) {
        $scope.pullRequests = [];

        githubService.getUserSubscriptions('chapperz').then(function (data) {
            for (var sub in data) {
                if (data[sub] && data[sub].open_issues !== 0) {
                    githubService.getPullRequest(data[sub].full_name).then(function (data) {
                        $scope.pullRequests.push(data);
                    });
                }
            }

        });
    });
