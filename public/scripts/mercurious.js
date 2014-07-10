'use strict';

angular
    .module('mercuriousApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute'
    ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/signin', {
                templateUrl: 'views/signin.html',
                controller: 'SigninCtrl'
            })
            .when('/memes/', {
                templateUrl: 'views/memes/main.html',
                controller: 'MainCtrl'
            })
            .when('/memes/create-meme/', {
                templateUrl: 'views/memes/create-meme.html',
                controller: 'CreateMemeCtrl'
            })
            .when('/memes/create-meme/:context', {
                templateUrl: 'views/memes/create-meme.html',
                controller: 'CreateMemeCtrl'
            })
            .when('/memes/meme/:id', {
                templateUrl: 'views/memes/view-meme.html',
                controller: 'ViewMemeCtrl'
            })
            .when('/memes/view-all-the-memes/', {
                templateUrl: 'views/memes/view-all-memes.html',
                controller: 'MainCtrl'
            })
            .when('/cr/', {
                templateUrl: 'views/code-review-overview.html',
                controller: 'CodeReviewOverviewCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $httpProvider.responseInterceptors.push(function ($q, $location) {
            return function (promise) {
                return promise.then(function (response) { return response; }, function (response) {
                    if (response.status === 401) {
                        $location.url('/signin');
                        console.log('Get outta here');
                    }
                    return $q.reject(response);
                });
            };
        });
    });
