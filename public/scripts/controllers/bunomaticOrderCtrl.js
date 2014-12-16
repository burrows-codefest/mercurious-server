'use strict';
angular.module('mercuriousApp')
    .controller('BunomaticOrderCtrl', function ($scope, bunomaticService) {
      function initFillingIds() {
        $scope.order.fillingIds = [];
      }

      $scope.order = {};
      initFillingIds();

      $scope.breads = {
        'bread0': {'id': 'bread0', 'name': 'Sandwich'},
        'bread1': {'id': 'bread1', 'name': 'Roll'},
        'bread2': {'id': 'bread2', 'name': 'Baguette'}
      };

      $scope.fillings = {
        'filling0': {'id': 'filling0', 'name': 'Sausage'},
        'filling1': {'id': 'filling1', 'name': 'Egg'},
        'filling2': {'id': 'filling2', 'name': 'Bacon'}
      };

      $scope.sauces = {
        'sauce0': {'id': 'sauce0', 'name': 'Brown'},
        'sauce1': {'id': 'sauce1', 'name': 'Tomato'}
      };

      $scope.toggleFilling = function (fillingId) {
        var fillingIndex = $scope.order.fillingIds.indexOf(fillingId);

        if (fillingIndex === -1) {
          $scope.order.fillingIds.push(fillingId);
        } else {
          $scope.order.fillingIds.splice(fillingIndex, 1);
        }
      };

      $scope.completeOrder = function () {
        var i;

        $scope.order.fillings = [];

        for (i = 0; i < $scope.order.fillingIds.length; i += 1) {
          $scope.order.fillings.push($scope.fillings[$scope.order.fillingIds[i]]);
        }

        delete $scope.order.fillingIds;
        initFillingIds();

        $scope.order.id = bunomaticService.getNewOrderId($scope.order.name);
      };
    });
