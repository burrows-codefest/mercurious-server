'use strict';

angular.module('mercuriousApp')
    .service('bunomaticService', function () {
        this.getNewOrderId = function (str) {
            return str.replace(/[aeiou]/ig,'').replace(' ', '').toUpperCase() + String(Date.now());
        };
    });
