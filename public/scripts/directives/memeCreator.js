'use strict';

angular.module('mercuriousApp')
    .directive('merMemeCreator', function (socket) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/scripts/directives/templates/meme-creator.html',
            link: function (scope) {
                scope.meme = {};
                scope.meme.title = 'Meme Line 1';
                scope.meme.text = 'Meme Line 2';
                scope.meme.type = 'memeCreator';

                scope.$watch('meme.imgUrl', function(newVal){
                    if (newVal == undefined || newVal == "") {
                        scope.meme.imgUrl = "/images/memeTemplates/lady1.jpg";
                    }
                });

                scope.submit = function() {
                    var d = new Date();

                    scope.meme.type = 'meme';
                    scope.meme.publishedDate =  String(d.getTime());

                    socket.emit('message', scope.meme);
                };
            }
        };
    });
