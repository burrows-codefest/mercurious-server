'use strict';

angular.module('mercuriousApp')
    .service('raceReportService', function () {
        var plurals = ['st', 'nd', 'rd', 'th'];
        
        this.compileRaceReport = function (raceReport) {
            raceReport.type = 'raceReport';
            raceReport.title = raceReport.result[0].driver.name + ' wins race ' +
                (parseInt(raceReport.id) + 1);
            
            var text = '<br />'
            for (var position in raceReport.result) {
                var plural = plurals[position];
                
                if (plural === undefined) {
                    plural = 'th'
                }
                
                text = text + '<strong>' + (parseInt(position) + 1) + plural + '</strong>: ' +
                    raceReport.result[position].driver.name + '<br />';
            }
            
            text = text + '<br /><strong>Fastest Lap</strong>: ' + raceReport.fastestLapDriver.name +
                    '<br /><br />' + 
                    '<strong>Class</strong>: ' + raceReport.carClass +
                    '<br />' + 
                    '<strong>Laps</strong>: ' + raceReport.laps +
                    '<br />' +
                    '<strong>Date</strong>: ' + raceReport.date;
            
            raceReport.text = text;
            raceReport.link = 'https://forza.firebaseapp.com/#/race-report/' + raceReport.id;
            
            return raceReport;
        };
    });