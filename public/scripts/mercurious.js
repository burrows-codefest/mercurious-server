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
            .when('/memes/create-meme/', {
                templateUrl: 'views/create-meme.html',
                controller: 'CreateMemeCtrl'
            })
            .when('/memes/create-meme/:context', {
                templateUrl: 'views/create-meme.html',
                controller: 'CreateMemeCtrl'
            })
            .when('/memes/meme/:id', {
                templateUrl: 'views/view-meme.html',
                controller: 'ViewMemeCtrl'
            })
            .when('/memes/view-all-the-memes/', {
                templateUrl: 'views/view-all-memes.html',
                controller: 'MainCtrl'
            })
            .when('/cr/', {
                templateUrl: 'views/code-review-overview.html',
                controller: 'CodeReviewOverviewCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
