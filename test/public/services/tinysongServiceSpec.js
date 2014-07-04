'use strict';

describe('Services: githubService', function () {
    var githubS, httpMock,
        user = 'testUser',
        gitUrl = 'https://api.github.com/',
        gitUserUrl = gitUrl + 'users/';

    beforeEach(module('mercuriousApp'));

    beforeEach(inject(function ($httpBackend) {
        httpMock = $httpBackend;
        inject(function ($injector) {
            githubS = $injector.get('githubService');
        });
    }));

    it('should return a github user info', function () {
        var promiseResult;

        httpMock.expectGET(gitUserUrl + user).respond('test1');

        githubS.getUserInfo(user).then(function (data) {
            promiseResult = data;
        });

        httpMock.flush();
        expect(promiseResult).toBe('test1');
    });
});
