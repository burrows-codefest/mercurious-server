'use strict';

angular.module('mercuriousApp')
    .directive('merViewMeme', function (dbService) {
        return {
            restrict: 'E',
            scope: {
                'merMeme': '=',
                'merCreateMode': '='
            },
            templateUrl: '/scripts/directives/templates/view-meme.html',
            link: function (scope) {
                scope.sendVote = function(memeId, action) {
                    dbService.sendVote(memeId, action);
                };
            }
        };
    });
