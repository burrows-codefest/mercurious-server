'use strict';

angular.module('mercuriousApp')
    .service('utilsService', function ($q) {
        this.isImage = function (src) {
            var deferred = $q.defer(),
                image = new Image();

            image.onerror = function() {
                deferred.resolve(false);
            };

            image.onload = function() {
                deferred.resolve(true);
            };

            image.src = src;

            return deferred.promise;
        };
    });
