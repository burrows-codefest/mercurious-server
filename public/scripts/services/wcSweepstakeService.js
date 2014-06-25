'use strict';

angular.module('mercuriousApp')
    .service('wcSweepstakeService', function rssFeedService() {
        this.getTeams = function () {
            var teams = [
                {
                    id: 0,
                    country: 'Australia',
                    rank: 57,
                    owner: 'RO',
                    eliminated: true
                },
                {
                    id: 1,
                    country: 'Iran',
                    rank: 49,
                    owner: 'Cleggor'
                },
                {
                    id: 2,
                    country: 'Japan',
                    rank: 44,
                    owner: 'Mike',
                    eliminated: true
                },
                {
                    id: 3,
                    country: 'South Korea',
                    rank: 56,
                    owner: 'Bread'
                },
                {
                    id: 4,
                    country: 'Algeria',
                    rank: 32,
                    owner: 'Martin'
                },
                {
                    id: 5,
                    country: 'Cameroon',
                    rank: 59,
                    owner: 'Dan B',
                    eliminated: true
                },
                {
                    id: 6,
                    country: 'Ghana',
                    rank: 23,
                    owner: 'Pete'
                },
                {
                    id: 7,
                    country: 'Ivory Coast',
                    rank: 17,
                    owner: 'Bobert',
                    eliminated: true
                },
                {
                    id: 8,
                    country: 'Nigeria',
                    rank: 33,
                    owner: 'Sad Thuin'
                },
                {
                    id: 9,
                    country: 'Costa Rica',
                    rank: 31,
                    owner: 'Bullitt'
                },
                {
                    id: 10,
                    country: 'Honduras',
                    rank: 34,
                    owner: 'Corndog'
                },
                {
                    id: 11,
                    country: 'Mexico',
                    rank: 24,
                    owner: 'Jengles'
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
                    owner: 'Chess'
                },
                {
                    id: 14,
                    country: 'Brazil',
                    rank: 11,
                    owner: 'Kirt'
                },
                {
                    id: 15,
                    country: 'Chile',
                    rank: 12,
                    owner: 'Chappers'
                },
                {
                    id: 16,
                    country: 'Colombia',
                    rank: 4,
                    owner: 'Sid'
                },
                {
                    id: 17,
                    country: 'Ecuador',
                    rank: 22,
                    owner: 'Barbs'
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
                    owner: 'Gokhan',
                    eliminated: true
                },
                {
                    id: 21,
                    country: 'Croatia',
                    rank: 18,
                    owner: 'Grimmers',
                    eliminated: true
                },
                {
                    id: 22,
                    country: 'England',
                    rank: 10,
                    owner: 'Alan Evans',
                    eliminated: true
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
                    owner: 'PM Jon'
                },
                {
                    id: 25,
                    country: 'Greece',
                    rank: 15,
                    owner: 'PM Dave'
                },
                {
                    id: 26,
                    country: 'Italy',
                    rank: 9,
                    owner: 'Bibha',
                    eliminated: true
                },
                {
                    id: 27,
                    country: 'Netherlands',
                    rank: 8,
                    owner: 'Dan B'
                },
                {
                    id: 28,
                    country: 'Portugal',
                    rank: 14,
                    owner: 'Moss'
                },
                {
                    id: 29,
                    country: 'Russia',
                    rank: 19,
                    owner: 'Scunny'
                },
                {
                    id: 30,
                    country: 'Spain',
                    rank: 1,
                    owner: 'Billy',
                    eliminated: true
                },
                {
                    id: 31,
                    country: 'Switzerland',
                    rank: 7
                }
            ];

            return teams;
        };
    });
