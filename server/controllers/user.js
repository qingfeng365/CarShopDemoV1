'use strict';
var ModelUser = require('../models/user');

module.exports.showSignup = function(req, res, next) {
  res.render('signup', {
    title: '汽车商城 注册页',
    user: {}
  });
};

module.exports.postSignup = function(req, res, next) {
  var userObj = req.body.user;
  if (!userObj) {
    return res.status(400).send('找不到合法数据.');
  }
  var docUser = new ModelUser(userObj);
  docUser.save(function(err, _user) {
    if (err) {
      return next(err);
    }
    return res.redirect('/');
  });
};
