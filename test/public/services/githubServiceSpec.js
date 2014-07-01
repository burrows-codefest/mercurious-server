'use strict';

describe('Services: githubService', function () {
    var githubS, httpMock;

    beforeEach(module('mercuriousApp'));

    beforeEach(inject(function ($httpBackend) {
        httpMock = $httpBackend;
        inject(function($injector) {
            githubS = $injector.get('githubService');
        });
    }));

    it('should return a github user info', function () {
        var promiseResult,
            user = 'chapperz',
            url = 'https://api.github.com/users/';

        httpMock.expectGET(url + user).respond('test1');

        githubS.getUserInfo(user).then(function (data) {
            promiseResult = data;
        });

        httpMock.flush();
        expect(promiseResult).toBe('test1');
    });

    it('should return a github users repos', function () {
        var promiseResult,
            user = 'chapperz',
            url = 'https://api.github.com/users/';

        httpMock.expectGET(url + user + '/repos').respond('test1');

        githubS.getUserRepos(user).then(function (data) {
            promiseResult = data;
        });

        httpMock.flush();
        expect(promiseResult).toBe('test1');
    });

    it('should return a github users subscriptions', function () {
        var promiseResult,
            user = 'chapperz',
            url = 'https://api.github.com/users/';

        httpMock.expectGET(url + user + '/subscriptions').respond('test1');

        githubS.getUserSubscriptions(user).then(function (data) {
            promiseResult = data;
        });

        httpMock.flush();
        expect(promiseResult).toBe('test1');
    });
});