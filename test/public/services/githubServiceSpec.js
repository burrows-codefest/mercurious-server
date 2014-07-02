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

    it('should return a github users with subscriptions that only have issues', function () {
        var promiseResult,
            mockSubscriptions = [
                {
                    "id": 16324626,
                    "name": "test1",
                    "full_name": "user1/test1",
                    "open_issues": 0
                },
                {
                    "id": 16324627,
                    "name": "test2",
                    "full_name": "user1/test2",
                    "open_issues": 3
                },
                {
                    "id": 16324628,
                    "name": "test3",
                    "full_name": "user2/test3",
                    "open_issues": 0
                },
                {
                    "id": 16324627,
                    "name": "test4",
                    "full_name": "user1/test4",
                    "open_issues": 1
                },
            ];

        httpMock.expectGET(gitUserUrl + user + '/subscriptions').respond(mockSubscriptions);

        githubS.getUserSubscriptionsWithIssues(user).then(function (data) {
            promiseResult = data;
        });

        httpMock.flush();
        expect(promiseResult.length).toBe(2);
        expect(promiseResult[0].name).toBe('test2');
        expect(promiseResult[1].name).toBe('test4');
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
