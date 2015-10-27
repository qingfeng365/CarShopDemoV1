'use strict';
var ModelCar = require('../models/car');
var ModelComment = require('../models/comment');

module.exports.post = function(req, res, next) {
  var commentObj = req.body.comment;
  if (!commentObj) {
    return res.status(400).send('找不到合法数据.');
  }
  var carId = commentObj.car;
  var docComment = new ModelComment(commentObj);
  docComment.save(function(err, _comment) {
    if (err) {
      return next(err);
    }
    return res.redirect('/car/' + carId);
  });

};
