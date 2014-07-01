'use strict';

describe('Services: githubService', function () {
    var githubS, httpMock,
        user = 'testUser',
        gitUrl = 'https://api.github.com/',
        gitUserUrl = gitUrl + 'users/';

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

    it('should return all users pull requests', function () {
        var mockPR;

        httpMock.expectGET(gitUrl + 'repos/' + user + '/pulls').respond('test1');

        githubS.getPullRequest(user).then(function (data) {
            mockPR = data;
        });

        httpMock.flush();
        expect(mockPR).toBe('test1');
    });
});