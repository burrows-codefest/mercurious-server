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
                templateUrl: 'views/mainCtrl.html',
                controller: 'MainCtrl'
            })
            .when('/create-meme/', {
                templateUrl: 'views/create-meme.html',
                controller: 'CreateMemeCtrl'
            })
            .when('/create-meme/:context', {
                templateUrl: 'views/create-meme.html',
                controller: 'CreateMemeCtrl'
            })
            .when('/meme/:id', {
                templateUrl: 'views/view-meme.html',
                controller: 'ViewMemeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
