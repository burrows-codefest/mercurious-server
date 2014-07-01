'use strict';

angular.module('mercuriousApp')
    .service('githubService', function ($http, $q) {
        var gitUrl = 'https://api.github.com/';

        this.getUserInfo = function (user) {
            var defer = $q.defer(),
                repoUrl = gitUrl + 'users/' + user;

            $http({method: 'GET', url: repoUrl}).success(function (data) {
                defer.resolve(data);
            }).
                error(function (data, status) {
                    defer.reject(status + ' | bad');
                });

            return defer.promise;
        };

        this.getUserRepos = function (user) {
            var defer = $q.defer(),
                repoUrl = gitUrl + 'users/' + user + '/repos';

            $http({method: 'GET', url: repoUrl}).success(function (data) {
                defer.resolve(data);
            }).
                error(function (data, status) {
                    defer.reject(status + ' | bad');
                });

            return defer.promise;
        };

        this.getUserSubscriptions = function (user) {
            var defer = $q.defer(),
                repoUrl = gitUrl + 'users/' + user + '/subscriptions';

            $http({method: 'GET', url: repoUrl}).success(function (data) {
                defer.resolve(data);
            }).
                error(function (data, status) {
                    defer.reject(status + ' | bad');
                });

            return defer.promise;
        };
    });
