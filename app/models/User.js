'use strict';

var model,
    mongoose = require('mongoose'),
    constants = require('../../config/constants'),
    modelName = constants.MODEL.USER;

function getSchema() {
    return {
        username: 'String',
        password: 'String'
    }
}

function initModel() {
    var Schema = mongoose.Schema,
        modelSchema = new Schema(getSchema());

    modelSchema.virtual('date')
        .get(function () {
            return this._id.getTimestamp();
        });

    model = mongoose.model(modelName, modelSchema);
}

module.exports = function () {
    if(!model) {
        initModel();
    }
    return model;
};