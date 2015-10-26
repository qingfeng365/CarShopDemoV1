'use strict';

var mongoose = require('mongoose');
var ModelComment = require('./models/comment');
var ModelCar = require('./models/car');
var ModelUser = require('./models/user');

mongoose.connect('mongodb://localhost/carShop');

ModelCar.findOne({}).exec(function(err, _car) {
  if (err) {
    console.log(err);
  }
  var carId = _car._id;

  ModelUser.findOne({}).exec(function(err, _user) {
    if (err) {
      console.log(err);
    }
    var userId = _user._id;

    var commentArray = [{
      car: carId,
      from: userId,
      content: '这是评论1....'
    }, {
      car: carId,
      from: userId,
      content: '这是评论2....'
    }, {
      car: carId,
      from: userId,
      content: '这是评论3....'
    }];
    ModelComment.create(commentArray, function(err, comments) {
      if (err) {
        console.log(err);
      } else {
        console.log('新增 %d 条记录', comments.length);
      }
      mongoose.disconnect();
    });
  });
});
