'use strict';

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket) {
        socket.on('message', function (data) {
            $scope.feed = data;
        });
    })
    .controller('MemeCtrl', function ($scope, $http, socket) {

        $scope.memeLine1 = "The longer you stare";
        $scope.memeLine2 = "the funnier it gets";

        $scope.$watch('memeImgUrl', function(newVal){

            if (newVal == undefined || newVal == "") {
                newVal = "/images/meme.jpg";
            }

            $scope.memeImgWrapperStyles = {"background-image": "url('" + newVal + "')"};

        });

        $scope.submit = function() {

            var memeObj = {};
            memeObj.type = 'meme';
            memeObj.data.line1 = $scope.memeLine1;
            memeObj.data.line2 = $scope.memeLine2;

            if ($scope.memeImgUrl == undefined || $scope.memeImgUrl == "") {
                memeObj.data.imgUrl = "/images/meme.jpg";
            }
            else {
                memeObj.data.imgUrl = $scope.memeImgUrl;
            }


            socket.emit('message', memeObj);

        };

    });
