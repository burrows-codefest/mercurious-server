'use strict';

angular.module('mercuriousApp')
    .service('dataSourceService', function dataSourceService() {
        this.getSources = function () {
            var sources = [
                {'name': 'b-intheknow RSS', 'type': 'RSS', 'url': 'http://b-intheknow.com/rss'}
            ];

            return sources;
        };
    });