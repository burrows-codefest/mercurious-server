'use strict';

angular.module('mercuriousApp')
    .service('tinysongService', function ($http, $q) {
        var tinysongUrl = '/api/song/';

       this.getSongs = function (searchText, limit) {
            var defer = $q.defer(),
                url = tinysongUrl + searchText + '?format=json';

            if(limit) {
              url += '&limit=' + limit;
            }

            $http.get(url).success(function (data) {
                console.log(data);
                defer.resolve(data);
            }).error(function (data, status) {
                console.log(data);
                defer.reject(status + ' | bad');
            });

            return defer.promise;
        };
    });
