'use strict';

angular.module('mercuriousApp')
    .directive('merMemeCreator', function (socket) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/scripts/directives/templates/meme-creator.html',
            link: function (scope) {

                scope.memeTemplates = [
                    {
                        id: 0,
                        imgUrl: 'images/memeTemplates/1bij.jpg',
                        name: 'One Does Not Simply'
                    },
                    {
                        id: 1,
                        imgUrl: 'images/memeTemplates/9ehk.jpg',
                        name: 'Batman Slapping Robin'
                    },
                    {
                        id: 2,
                        imgUrl: 'images/memeTemplates/1bh8.jpg',
                        name: 'The Most Interesting Man In The World'
                    },
                    {
                        id: 3,
                        imgUrl: 'images/memeTemplates/8p0a.jpg',
                        name: 'Grumpy Cat'
                    },
                    {
                        id: 4,
                        imgUrl: 'images/memeTemplates/1w6tn.jpg',
                        name: 'Well That Escalated Quickly'
                    },
                    {
                        id: 5,
                        imgUrl: 'images/memeTemplates/1bhf.jpg',
                        name: 'First World Problems'
                    }
                ];

                scope.meme = {};
                scope.meme.title = 'Meme Line 1';
                scope.meme.text = 'Meme Line 2';
                scope.meme.type = 'memeCreator';
                scope.meme.imgObj = scope.memeTemplates[0];

                scope.submit = function () {
                    var d = new Date();

                    scope.meme.type = 'meme';
                    scope.meme.imgUrl = scope.meme.imgObj.imgUrl;
                    scope.meme.publishedDate = String(d.getTime());

                    socket.emit('message', scope.meme);
                };
            }
        };
    });
