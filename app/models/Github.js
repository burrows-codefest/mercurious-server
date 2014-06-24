var model,
    mongoose = require('mongoose'),
    constants = require('../../config/constants');

function getSchema() {
    return {
        publishedDate: Date,
        githubBody: Object
    }
}

function initModel() {
    var Schema = mongoose.Schema,
        githubSchema = new Schema(getSchema());

    githubSchema.virtual('date')
        .get(function () {
            return this._id.getTimestamp();
        });

    model = mongoose.model(constants.MODEL.GITHUB, githubSchema);
}

module.exports = function () {
    if(!model) {
        initModel();
    }
    return model;
};


