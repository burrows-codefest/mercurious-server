'use strict';

angular.module('mercuriousApp')
    .service('raceReportService', function () {
        this.compileRaceReport = function (raceReport) {
            raceReport.type = 'raceReport';
            raceReport.title = raceReport.result[0].driver.name + ' wins race ' +
                (parseInt(raceReport.id) + 1);
            
            var text = '<br />';

            text = text + 
                    '<strong>Class</strong>: ' + raceReport.carClass +
                    '<br />' + 
                    '<strong>Laps</strong>: ' + raceReport.laps +
                    '<br />' +
                    '<strong>Fastest Lap</strong>: ' + raceReport.fastestLapDriver.name;
            
            text = text + '<h2>Result</h2><ol>';

            for (var position in raceReport.result) {
                if (raceReport.result[position].driver) {
                    text = text + '<li>' + raceReport.result[position].driver.name + '</li>';
                }
            }

            text = text + '</ol>';

            raceReport.text = text;
            raceReport.link = 'https://forza.firebaseapp.com/#/race-report/' + raceReport.id;
            
            return raceReport;
        };
    });
