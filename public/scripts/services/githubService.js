'use strict';

angular.module('mercuriousApp')
    .service('githubService', function ($http, $q) {
        var gitUrl = 'https://api.github.com/';

        function getUserSubs(user) {
            var defer = $q.defer(),
                repoUrl = gitUrl + 'users/' + user + '/subscriptions';

            $http({method: 'GET', url: repoUrl}).success(function (data) {
                defer.resolve(data);
            }).error(function (data, status) {
                defer.reject(status + ' | bad');
            });

            return defer.promise;
        }

        this.getUserInfo = function (user) {
            var defer = $q.defer(),
                repoUrl = gitUrl + 'users/' + user;

            $http({method: 'GET', url: repoUrl}).success(function (data) {
                defer.resolve(data);
            }).error(function (data, status) {
                defer.reject(status + ' | bad');
            });

            return defer.promise;
        };

        this.getUserRepos = function (user) {
            var defer = $q.defer(),
                repoUrl = gitUrl + 'users/' + user + '/repos';

            $http({method: 'GET', url: repoUrl}).success(function (data) {
                defer.resolve(data);
            }).error(function (data, status) {
                defer.reject(status + ' | bad');
            });

            return defer.promise;
        };

        this.getUserSubscriptions = function (user) {
            return getUserSubs(user);
        };

        this.getUserSubscriptionsWithIssues = function (user) {
            var defer = $q.defer(),
                repoUrl = gitUrl + 'users/' + user + '/subscriptions';

            $http({method: 'GET', url: repoUrl}).success(function (data) {
                var i, subsWithIss = [];

                for (i = 0; i < data.length; i += 1) {
                    if (data[i] && data[i].open_issues !== 0) {
                        subsWithIss.push(data[i]);
                    }
                }
                defer.resolve(subsWithIss);
            }).error(function (data, status) {
                defer.reject(status + ' | bad');
            });

            return defer.promise;
        };

        this.getPullRequest = function (fullname) {
            var deferPR = $q.defer();

            $http({method: 'GET', url: gitUrl + 'repos/' + fullname + '/pulls'})
                .success(function (data) {
                    deferPR.resolve(data);
                }).
                error(function (data, status) {
                    deferPR.reject(status + ' | bad');
                });

            return deferPR.promise;
        };
    });
