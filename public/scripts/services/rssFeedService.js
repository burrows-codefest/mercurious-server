'use strict';

angular.module('mercuriousApp')
    .service('rssFeedService', function rssFeedService($rootScope, $http, $q) {
        this.getFeed = function (url) {
            var googApi = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=',
                deferred = $q.defer();

            $http.jsonp(googApi + encodeURIComponent(url)).
                success(function (data) {
                    deferred.resolve(data);
                }).
                error(function (data, status) {
                    deferred.reject(status + ' | bad');
                });

            return deferred.promise;
        };
    });