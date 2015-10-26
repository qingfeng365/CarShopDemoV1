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
  meta: {
    createDate: {
      type: Date,
      default: Date.now()
    }
  }
});
