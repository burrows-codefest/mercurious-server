'use strict';

describe('Directive: Feed', function() {
    var $compile, $rootScope, httpMock,
        mockSocket = {
            emit: function () {},
            on: function () {
                var obj = {};

                obj.repositoryName = 'repoName';

                return obj;
            }
        },
        mockHtml = '<h2>Test Title</h2>';

    beforeEach(function() {
        module('mercuriousApp');

        module(function($provide) {
            $provide.value('socket', mockSocket);
        });
    });

    beforeEach(inject(function(_$compile_, _$rootScope_, $injector, $httpBackend){
        httpMock = $httpBackend;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Should display title', function() {
        var element = $compile('<mer-feed mer-title="\'Test Title\'"></mer-feed>')($rootScope);

        httpMock.expectGET('/scripts/directives/templates/feed.html').respond(mockHtml);

        httpMock.flush();
        $rootScope.$digest();

        expect(element.html()).toContain('<h2>Test Title</h2>');
    });
});
