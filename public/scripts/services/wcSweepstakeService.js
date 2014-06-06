'use strict';

angular.module('mercuriousApp')
    .service('wcSweepstakeService', function rssFeedService() {
        this.getRandomTeam = function () {
            var randNum = Math.round(Math.random()*(teams.length - 1));

            return (teams[randNum]);
        };
    });

var teams = [
    {
        id: 0,
        country: 'Australia',
        rank: 57,
        owner: 'Richard Orchard'
    },
    {
        id: 1,
        country: 'Iran',
        rank: 49,
        owner: '"Rockstar" Ricky Clegg'
    },
    {
        id: 2,
        country: 'Japan',
        rank: 44,
        owner: 'Mike'
    },
    {
        id: 3,
        country: 'South Korea',
        rank: 56,
        owner: 'Brad Collier-Brown'
    },
    {
        id: 4,
        country: 'Algeria',
        rank: 32,
        owner: 'Martin Smith'
    },
    {
        id: 5,
        country: 'Cameroon',
        rank: 59,
        owner: 'Dan Banting'
    },
    {
        id: 6,
        country: 'Ghana',
        rank: 23,
        owner: 'Pete Fitzpatrick'
    },
    {
        id: 7,
        country: 'Ivory Coast',
        rank: 17,
        owner: 'Rob Hunt'
    },
    {
        id: 8,
        country: 'Nigeria',
        rank: 33,
        owner: 'Thuin Kahn'
    },
    {
        id: 9,
        country: 'Costa Rica',
        rank: 31,
        owner: 'Steve McHugh'
    },
    {
        id: 10,
        country: 'Honduras',
        rank: 34,
        owner: 'Christian Cornwall'
    },
    {
        id: 11,
        country: 'Mexico',
        rank: 24,
        owner: 'Jennie Ward'
    },
    {
        id: 12,
        country: 'United States',
        rank: 13,
        owner: 'Tim'
    },
    {
        id: 13,
        country: 'Argentina',
        rank: 3,
        owner: 'Ian Henry-Macklin'
    },
    {
        id: 14,
        country: 'Brazil',
        rank: 11,
        owner: 'Kirt Reddin'
    },
    {
        id: 15,
        country: 'Chile',
        rank: 12,
        owner: 'Ben Chaplin'
    },
    {
        id: 16,
        country: 'Colombia',
        rank: 4,
        owner: 'Sid Kerr'
    },
    {
        id: 17,
        country: 'Ecuador',
        rank: 22,
        owner: 'Tom Barber'
    },
    {
        id: 18,
        country: 'Uruguay',
        rank: 6,
        owner: 'George'
    },
    {
        id: 19,
        country: 'Belgium',
        rank: 5,
        owner: 'Ben Smith'
    },
    {
        id: 20,
        country: 'Bosnia and Herzegovina',
        rank: 16,
        owner: 'Gokhan Karasoglu'
    },
    {
        id: 21,
        country: 'Croatia',
        rank: 18,
        owner: 'Ben Grimwood'
    },
    {
        id: 22,
        country: 'England',
        rank: 10,
        owner: 'Alan Evans'
    },
    {
        id: 23,
        country: 'France',
        rank: 21,
        owner: 'Toast'
    },
    {
        id: 24,
        country: 'Germany',
        rank: 2,
        owner: 'Jon Garrett'
    },
    {
        id: 25,
        country: 'Greece',
        rank: 15,
    },
    {
        id: 26,
        country: 'Italy',
        rank: 9,
        owner: 'Bibha Pandey'
    },
    {
        id: 27,
        country: 'Netherlands',
        rank: 8,
        owner: 'Dan Banting'
    },
    {
        id: 28,
        country: 'Portugal',
        rank: 14
    },
    {
        id: 29,
        country: 'Russia',
        rank: 19,
        owner: 'Testing Thomas'
    },
    {
        id: 30,
        country: 'Spain',
        rank: 1,
        owner: 'Billy Pittard'
    },
    {
        id: 31,
        country: 'Switzerland',
        rank: 7
    }
];
