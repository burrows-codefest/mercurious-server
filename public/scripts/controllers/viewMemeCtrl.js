'use strict';
angular.module('mercuriousApp')
    .controller('ViewMemeCtrl', function ($scope, $routeParams, $http) {
        $http.get('/api/getItem/' + $routeParams.id).success(function(data) {
            $scope.item = data;
        });
    });
