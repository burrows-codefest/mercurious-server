'use strict';

angular.module('mercuriousApp')
    .service('dbService', function ($http, $q) {
        this.getById = function (itemId) {
            var defer = $q.defer();

            $http.get('/api/getItem/' + itemId).success(function(data) {
                defer.resolve(data);
            }).
            error(function (data, status) {
                deferred.reject(status + ' | bad');
            });

            return defer.promise;
        };
    });