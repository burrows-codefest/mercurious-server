'use strict';

angular.module('mercuriousApp')
    .controller('CreateMemeCtrl', function ($scope, $location, $routeParams, $timeout, socket, memeService, utilsService) {

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
        $scope.meme.imgUrl = $scope.memeTemplates[0].imgUrl;

        $scope.changeFontColor = function (color) {
            $scope.meme.fontColor = color + '-font';
        };

        $scope.setTemplate = function (template) {
            $scope.meme.imgUrl = template.imgUrl;
            $scope.imgUrl = '';
            $scope.invalidImg = false;
        }

        $scope.customTemplate = function (url) {
            utilsService.isImage(url).then(function(test) {
                if (test) {
                    $scope.meme.imgUrl = url;
                    $scope.invalidImg = false;
                } else {
                    $scope.meme.imgUrl = $scope.memeTemplates[0].imgUrl;
                    $scope.invalidImg = true;
                }
            });
        }

        $scope.submit = function () {
            var d = new Date();

            $scope.meme.likes = 0;
            $scope.meme.dislikes = 0;
            $scope.meme.publishedDate = d.getTime();

            socket.emit('message', $scope.meme);
            $timeout(function(){
                $location.path('/');
            }, 1000);
        };
    });
