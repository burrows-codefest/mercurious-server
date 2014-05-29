'use strict';

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket, dataSourceService, rssFeedService) {

        $scope.newValue = 'edit socket';

        socket.on('message', function (data) {
            $scope.test = data;
        });

        $scope.editSocket = function() {
            socket.emit('message', $scope.newValue);
        };

        dataSourceService.getSources().forEach(function(feed) {
            rssFeedService.getFeed(feed.url).then(function (res) {
                $scope.feed = res.responseData.feed.entries;
            });
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

            memeObj.line1 = $scope.memeLine1;
            memeObj.line2 = $scope.memeLine2;

            if ($scope.memeImgUrl == undefined || $scope.memeImgUrl == "") {
                memeObj.imgUrl = "/images/meme.jpg";
            }
            else {
                memeObj.imgUrl = $scope.memeImgUrl;
            }


            socket.emit('meme', memeObj);

        };

    });