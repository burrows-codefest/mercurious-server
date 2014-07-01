'use strict';
angular.module('mercuriousApp')
    .controller('CodeReviewOverviewCtrl', function ($scope, socket, githubService) {
        githubService.getUserInfo('chapperz').then(function (data) {
                $scope.user = data;
                console.log(data);
            }
        );

        githubService.getUserRepos('chapperz').then(function (data) {
            $scope.repositories = data;
            console.log(data);
        });

        githubService.getUserSubscriptions('chapperz').then(function (data) {
            $scope.subscriptions = data;
            console.log(data);
        });
    });
