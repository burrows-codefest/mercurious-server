'use strict';

var model,
    mongoose = require('mongoose'),
    constants = require('../../config/constants'),
    modelName = constants.MODEL.GITHUB;

function getSchema() {
    return {
        id: Number,
        title: String,
        body: String,
        status: String,
        url: String,
        publishUserId: String,
        publishedUserName: String,
        publishedDate: Date,
        closedDate: Date,
        repositoryId: Number,
        repositoryName: String
    };
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

module.exports = (function () {
    if(!model) {
        initModel();
    }
    return model;
})();
