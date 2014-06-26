'use strict';

module.exports = {
    unit: {
        src: ['test/unit/**/*Spec.js'],
        options: {
            ui: 'bdd',
            reporter: 'spec'
        }
    },
    integration: {
        src: ['test/integration/**/*Spec.js'],
        options: {
            ui: 'bdd',
            reporter: 'spec',
            timeout: 10000
        }
    }
};
