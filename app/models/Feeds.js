'use strict';

var mongoose = require('mongoose'),
    constants = require('../../config/constants'),
    Schema = mongoose.Schema,
    FeedsModel,
    FeedSchema = new Schema({
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
    });

FeedSchema.virtual('date')
    .get(function () {
        return this._id.getTimestamp();
    });

FeedsModel = mongoose.model(constants.MODEL.FEED, FeedSchema);
