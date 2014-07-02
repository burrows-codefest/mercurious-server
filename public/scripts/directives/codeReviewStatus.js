'use strict';

angular.module('mercuriousApp')
    .directive('merCodeReviewStatus', function (socket) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/code-review-status.html',
            link: function (scope) {
                scope.pullRequests = [];

                socket.emit('githubAllPullRequest', {type: 'github'});

                socket.on('githubAllPullRequest', function (data) {
                    scope.pullRequests = data;
                });

                socket.on('githubNewPullRequest', function(data) {
                    scope.pullRequests.push(data);
                });

                socket.on('githubUpdatedPullRequest', function(data) {
                    scope.pullRequests.push(data);
                });
            }
        };
    });