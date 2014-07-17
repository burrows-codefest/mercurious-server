'use strict';

var FeedsModel = require('../models/Feeds'),
    constants = require('../../config/constants');

exports.updateVote = function(socks, req, res) {
    var id = req.params.reqId;

    FeedsModel.findById(id, function(err, item) {
        var newTotal,
            obj = {},
            voteType = req.body.type;

        if (!item[voteType]) {
            item[voteType] = 0;
        }
        newTotal = item[voteType] + 1;

        obj[voteType] = newTotal;

        FeedsModel.findByIdAndUpdate(id, { $set: obj}, function () {
            var changedObj = {};
            changedObj.id = id;
            changedObj.type = voteType;
            changedObj.value = newTotal;

            socks.sockets.emit(constants.SOCKET.VOTE, changedObj);
            res.json(item);
        });
    });
};
