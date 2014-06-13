'use strict';

angular
    .module('mercuriousApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'firebase'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/meme/:id', {
                templateUrl: 'views/view-meme.html',
                controller: 'ViewMemeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
