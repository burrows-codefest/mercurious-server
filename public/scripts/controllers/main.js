'use strict';

function isRickyLast(result) {
    var last = result.length - 1;
    
    return result[last].driver.id === 5;
}

function getEasterEgg(race) {
    var item = {},
        d = new Date();
    
    item.type = 'meme';
    item.imgUrl = '/images/forza-groundhog.jpg';
    item.publishedDate = race.publishedDate;
    
    return item;
}

angular.module('mercuriousApp')
    .controller('MainCtrl', function ($scope, socket, $firebase, raceReportService) {
        var raceReportsLoaded = false,
            raceReportsRef = new Firebase('https://forza.firebaseio.com/raceReports/');
        
        $scope.createMeme = false;
        $scope.feed = [];

        socket.emit('message', {type: 'feed'});

        socket.on('message', function (data) {
            console.log(data);
            $scope.feed = data;
        });

        socket.on('new item', function (data) {
            console.log(data);
            $scope.feed.push(data);
        });
        socket.on('ping', function () {
            socket.emit('pong');
        });
        
        $scope.raceReports = $firebase(raceReportsRef);
        
        $scope.raceReports.$on('loaded', function(races) {
            for (var race in races) {
                if (races[race]) {
                    $scope.feed.push(raceReportService.compileRaceReport(races[race]));

                    if (isRickyLast(races[race].result)) {
                        $scope.feed.push(getEasterEgg(races[race]));
                    }
                }
            }
            raceReportsLoaded = true;
        });
        
        $scope.raceReports.$on('change', function(raceId) {
            if (raceReportsLoaded === true && $scope.raceReports[raceId]) {
                $scope.feed.push(raceReportService.compileRaceReport($scope.raceReports[raceId]));
                
                if (isRickyLast($scope.raceReports[raceId].result)) {
                    $scope.feed.push(getEasterEgg($scope.raceReports[raceId]));
                }
            }
        });
    });
