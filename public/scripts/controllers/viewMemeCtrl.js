'use strict';
angular.module('mercuriousApp')
    .controller('ViewMemeCtrl', function ($scope, $routeParams, dbService) {
        dbService.getById($routeParams.id).then(function(data) {
            $scope.item = data;
        });
    });
