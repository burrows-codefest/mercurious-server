'use strict';

angular.module('mercuriousApp')
    .directive('merWcSweepstake', function (wcSweepstakeService) {
        return {
            restrict: 'E',
            templateUrl: '/scripts/directives/templates/wc-sweepstake.html',
            link: function (scope) {
                scope.teams = wcSweepstakeService.getTeams();
                scope.flags = wcSweepstakeService.getFlags();
            }
        };
    });
