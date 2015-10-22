'use strict';

module.exports.showSignup = function(req, res, next) {
  res.render('signup', {
    title: '汽车商城 注册页',
    user: {}
  });
}
