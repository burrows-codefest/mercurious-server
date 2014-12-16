'use strict';

describe('Ctrl: BunomaticOrderCtrl', function() {
    beforeEach(module('mercuriousApp'));

    var BunomaticOrderCtrl,
        scope;

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        BunomaticOrderCtrl = $controller('BunomaticOrderCtrl', {
            $scope: scope
        });
    }));

    it('should test scope', function () {
        expect(scope.test).toBe('123');
    });
});
