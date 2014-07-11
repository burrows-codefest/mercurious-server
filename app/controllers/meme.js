'use strict';

var FeedsModel = require('../models/Feeds');

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

            socks.sockets.emit('vote', changedObj);
            res.json(item);
        });
    });
};
