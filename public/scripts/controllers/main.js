'use strict';

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket, $firebase, raceReportService) {
        var raceReportsLoaded = false,
            raceReportsRef = new Firebase('https://forza.firebaseio.com/raceReports/');
        
        $scope.createMeme = false;
        $scope.feed = [];

        socket.on('message', function (data) {
            $scope.feed = data;
        });

        socket.on('new item', function (data) {
            $scope.feed.push(data);
        });
        
        $scope.raceReports = $firebase(raceReportsRef);
        
        $scope.raceReports.$on('loaded', function(races) {
            for (var race in races) {
                $scope.feed.push(raceReportService.compileRaceReport(races[race]));
            }
            raceReportsLoaded = true;
        });
        
        $scope.raceReports.$on('change', function(raceId) {
            if (raceReportsLoaded === true) {
                $scope.feed.push(raceReportService.compileRaceReport($scope.raceReports[raceId]));
            }
        });
    });
