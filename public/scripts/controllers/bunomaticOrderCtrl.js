'use strict';
angular.module('mercuriousApp')
    .controller('BunomaticOrderCtrl', function ($scope) {
      $scope.order = {};
      $scope.order.id = '123';
      $scope.order.fillings = [];

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
        var fillingIndex = $scope.order.fillings.indexOf(fillingId);

        if (fillingIndex === -1) {
          $scope.order.fillings.push(fillingId);
        } else {
          $scope.order.fillings.splice(fillingIndex, 1);
        }
      };

      $scope.completeOrder = function (order) {
        console.log(order);
      };
    });
