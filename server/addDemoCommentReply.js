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

  ModelComment.findOne({
    car: carId
  }).sort('meta.createDate').exec(function(err, _comment) {
    if (err) {
      console.log(err);
    }
    var replyTo = _comment.from;

    ModelUser.findOne({
      name: 'admin'
    }).exec(function(err, _user) {
      var replyFrom = _user._id;

      _comment.reply.push({
        from: replyFrom,
        to: replyTo,
        content: '这是回复1....'
      });
      _comment.reply.push({
        from: replyFrom,
        to: replyTo,
        content: '这是回复2....'
      });
      _comment.reply.push({
        from: replyFrom,
        to: replyTo,
        content: '这是回复3....'
      });

      _comment.save(function(err, __comment) {
        if (err) {
          console.log(err);
        } else {
          console.log('已保存成功');
        }
        console.log(__comment);
        mongoose.disconnect();
      });
    });
  });
});
