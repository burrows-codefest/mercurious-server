'use strict';
angular.module('mercuriousApp')
    .controller('CreateMemeCtrl', function ($scope, $location, $routeParams, $timeout, socket, memeService) {
        $scope.memeTemplates = memeService.getMemeImages();

        $scope.meme = {};

        if ($routeParams.context) {
            $scope.meme.context = '<a href="/#/meme/' + $routeParams.context + '">Meme</a>';
        } else {
            $scope.meme.context = '';
        }

        $scope.meme.title = '';
        $scope.meme.text = '';
        $scope.meme.type = 'meme';
        $scope.meme.fontColor = 'white-font';
        $scope.meme.imgObj = $scope.memeTemplates[0];

        $scope.changeFontColor = function (color) {
            $scope.meme.fontColor = color + '-font';
        };

        $scope.submit = function () {
            var d = new Date();

            $scope.meme.imgUrl = $scope.meme.imgObj.imgUrl;
            $scope.meme.publishedDate = d.getTime();

            socket.emit('message', $scope.meme);
            $timeout(function(){
                $location.path('/');
            }, 1000);
        };
    });
