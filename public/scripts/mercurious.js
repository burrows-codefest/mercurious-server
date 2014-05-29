'use strict';

angular
    .module('mercuriousApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/meme', {
                templateUrl: 'views/meme.html',
                controller: 'MemeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
