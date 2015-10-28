'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schemaComment = new mongoose.Schema({
  car: {
    type: ObjectId,
    ref: 'ModelCar'
  },
  from: {
    type: ObjectId,
    ref: 'ModelUser'
  },
  content: {
    type: String,
    required: true
  },
  reply: [{
    from: {
      type: ObjectId,
      ref: 'ModelUser'
    },
    to: {
      type: ObjectId,
      ref: 'ModelUser'
    },
    content: {
      type: String,
      required: true
    },
    meta: {
      createDate: {
        type: Date,
        default: Date.now()
      }
    }
  }],
  meta: {
    createDate: {
      type: Date,
      default: Date.now()
    }
  }
});

schemaComment.statics = {
  fetchByCarId: function(carId, cb) {
    return this
      .find({
        car: carId
      })
      .sort('meta.createDate')
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')
      .exec(cb);
  }
};

var ModelComment = mongoose.model('ModelComment', schemaComment, 'comment');

module.exports = ModelComment;
