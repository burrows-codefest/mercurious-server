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

    it('should add filling to order', function () {
        scope.order = {fillings: ['filling1']};

        scope.toggleFilling('filling2');

        expect(scope.order.fillings.length).toBe(2);
    });

    it('should remove filling from order', function () {
        scope.order = {fillings: ['filling1']};

        scope.toggleFilling('filling1');

        expect(scope.order.fillings.length).toBe(0);
    });
});
