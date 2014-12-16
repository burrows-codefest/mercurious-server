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
        scope.order = {fillingIds: ['filling1']};

        scope.toggleFilling('filling2');

        expect(scope.order.fillingIds.length).toBe(2);
    });

    it('should remove filling from order', function () {
        scope.order = {fillingIds: ['filling1']};

        scope.toggleFilling('filling1');

        expect(scope.order.fillingIds.length).toBe(0);
    });

    it('should order me a sausage and egg roll', function () {
        var mockOrder = {
            breadId: 'bread1',
            fillingIds: ['filling0', 'filling1'],
            name: 'Test 1',
            sauce: {'id':'sauce0', 'name':'Brown'}
        };

        scope.order = mockOrder;

        scope.completeOrder();

        expect(scope.order.name).toBe('Test 1');
        expect(scope.order.id).toContain(scope.order.name.replace(/[aeiou]/ig,'').replace(' ', '').toUpperCase());
        expect(scope.order.bread.name).toBe('Roll');
        expect(scope.order.fillings[0].name).toBe('Sausage');
        expect(scope.order.fillings[1].name).toBe('Egg');
        expect(scope.order.price).toBe(3);
    });

});
