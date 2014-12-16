'use strict';
angular.module('mercuriousApp')
    .controller('BunomaticOrderCtrl', function ($scope, bunomaticService) {
      function initFillingIds() {
        $scope.order.fillingIds = [];
      }

      $scope.order = {};
      initFillingIds();

      $scope.breads = {
        'bread0': {'id': 'bread0', 'name': 'Sandwich', price: 2.70, extraItemPrice: 3.70,  theWorksPrice: 4.00},
        'bread1': {'id': 'bread1', 'name': 'Roll', price: 1.80, extraItemPrice: 3.00,  theWorksPrice: 3.25},
        'bread2': {'id': 'bread2', 'name': 'Baguette', price: 2.70, extraItemPrice: 3.70,  theWorksPrice: 4.00}
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

      $scope.updatePrice = function () {
        var pricingStrategy;

        if ($scope.order.breadId) {
          if ($scope.order.fillingIds.length === 1) {
            pricingStrategy = 'price';
          } else if ($scope.order.fillingIds.length === 2) {
            pricingStrategy = 'extraItemPrice';
          } else if ($scope.order.fillingIds.length >= 3) {
            pricingStrategy = 'theWorksPrice';
          }

          $scope.order.price = $scope.breads[$scope.order.breadId][pricingStrategy];
        }
      };

      $scope.completeOrder = function () {
        var i;

        $scope.order.fillings = [];

        for (i = 0; i < $scope.order.fillingIds.length; i += 1) {
          $scope.order.fillings.push($scope.fillings[$scope.order.fillingIds[i]]);
        }

        $scope.order.bread = $scope.breads[$scope.order.breadId];

        $scope.updatePrice();

        $scope.order.id = bunomaticService.getNewOrderId($scope.order.name);
      };
    });
