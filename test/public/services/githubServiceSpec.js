'use strict';

describe('Services: githubService', function () {
    var githubS, httpMock,
        user = 'testUser',
        gitUserUrl = 'https://api.github.com/users/';

    beforeEach(module('mercuriousApp'));

    beforeEach(inject(function ($httpBackend) {
        httpMock = $httpBackend;
        inject(function($injector) {
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

    it('should return a github users repos', function () {
        var promiseResult;

        httpMock.expectGET(gitUserUrl + user + '/repos').respond('test1');

        githubS.getUserRepos(user).then(function (data) {
            promiseResult = data;
        });

        httpMock.flush();
        expect(promiseResult).toBe('test1');
    });

    it('should return a github users subscriptions', function () {
        var promiseResult;

        httpMock.expectGET(gitUserUrl + user + '/subscriptions').respond('test1');

        githubS.getUserSubscriptions(user).then(function (data) {
            promiseResult = data;
        });

        httpMock.flush();
        expect(promiseResult).toBe('test1');
    });
});