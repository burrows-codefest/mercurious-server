'use strict';
angular.module('mercuriousApp')
    .controller('CodeReviewOverviewCtrl', function ($scope, socket, githubService) {
        githubService.getUserSubscriptionsWithIssues('chapperz').then(function (data) {
            $scope.subscriptionsWithIssues = data;
        });
    });
