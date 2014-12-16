'use strict';

angular.module('mercuriousApp')
    .service('bunomaticService', function () {
        this.getNewOrderId = function (str) {
            return str.replace(/[aeiou]/ig,'').replace(' ', '').toUpperCase() +
                String(Math.floor((Math.random() * 1000) + 1));
        };
    });
