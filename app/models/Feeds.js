var model,
    mongoose = require('mongoose'),
    constants = require('../../config/constants'),
    modelName = constants.MODEL.FEED;

function getSchema() {
    return {
        title: String,
        type: String,
        url: String,
        text: String,
        imgUrl: String,
        twitterId: String,
        publishedDate: Date,
        likes: Number,
        dislikes: Number,
        context: String,
        fontColor: String,
        githubBody: Object
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


