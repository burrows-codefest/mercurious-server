'use strict';
var models,
    fs = require('fs'),
    modelsPath = '../../../app/models/',
    absModelsPath = __dirname + '/' + modelsPath;

models = fs.readdirSync(absModelsPath);

models.forEach(function (model) {
    setTestsForModel(model);
});


function mockMongoose(mongoose, modelSpy) {
    mongoose.model = modelSpy;
    mongoose.Schema = sinon.spy(function (schema) {
        return {
            virtual: function () {
                return this;
            },
            get: function () {
                return this;
            }
        }
    });
}

function setTestsForModel(modelName) {
    var model, mongoose,
        modelSpy = sinon.spy(),
        modelPath = modelsPath + modelName;

    describe('Model: ' + modelName, function () {
        before(function () {
            mongoose = require('mongoose');
            mockMongoose(mongoose);
        });

        after(function () {
            delete require.cache['mongoose'];
        });

        beforeEach(function () {
            mockMongoose(mongoose, modelSpy);
            model = require(modelPath);
        });

        afterEach(function () {
            delete require.cache[require.resolve(modelPath)];
        });

        it('should not be undefined', function () {
            expect(model).to.be.ok;
        });

        it('should only call init model function once', function () {
            model = require(modelPath);
            expect(modelSpy.calledOnce).to.be.ok;
        });
    });
}
