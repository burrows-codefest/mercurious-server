'use strict';

describe('Directive: CodeReviewStatus', function() {
    var $compile, $rootScope, httpMock,
        mockSocket = {
            emit: function () {},
            on: function () {
                var obj = {};

                obj.repositoryName = 'repoName';

                return obj;
            }
        },
        mockHtml = '<h2>Code Reviews</h2>';

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

    it('Replaces the element with the appropriate content', function() {
        var element = $compile('<mer-code-review-status></mer-code-review-status>')($rootScope);

        httpMock.expectGET('/scripts/directives/templates/code-review-status.html').respond(mockHtml);

        httpMock.flush();
        $rootScope.$digest();

        expect(element.html()).toContain('<h2>Code Reviews</h2>');
    });
});