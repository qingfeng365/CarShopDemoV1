'use strict';
var ModelUser = require('../models/user');

module.exports.showSignup = function(req, res, next) {
  res.render('signup', {
    title: '汽车商城 注册页',
    user: {}
  });
};

module.exports.showSignin = function(req, res, next) {
  res.render('signin', {
    title: '汽车商城 登录页',
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
    req.session.user = _user;
    return res.redirect('/');
  });
};

module.exports.postSignin = function(req, res, next) {
  var userObj = req.body.user;
  if (!userObj) {
    return res.status(400).send('找不到合法数据.');
  }
  var name = userObj.name;
  var inputpw = userObj.password;
  ModelUser.findOne({
    name: name
  }, function(err, _user) {
    if (err) {
      console.log(err);
      return res.redirect('/signup');
    }
    if (!_user) {
      return res.redirect('/signup');
    }
    _user.comparePassword(inputpw, function(err, isMatch) {
      if (err) {
        console.log(err);
        return res.redirect('/signin');
      }
      if (isMatch) {
        console.log('用户: %s 登录验证成功.', name);
        req.session.user = _user;
        var id = _user._id;
        ModelUser.findOneAndUpdate({_id:id},{$set:{lastSigninDate:Date.now()}},function(err, _user){
          if (err) {
            return next(err);
          }          
          return res.redirect('/');
        });
      } else {
        return res.redirect('/signin');
      }
    });
  });
};

module.exports.logout = function(req, res, next) {
  req.session.destroy(function(err) {
    return res.redirect('/');
  });
};

module.exports.requireSignin = function(req, res, next) {
  var user = req.session.user;
  if (!user) {
    return res.redirect('/signin');
  }
  next();
};

module.exports.requireAdmin = function(req, res, next) {
  var user = req.session.user;
  if (!user) {
    return res.redirect('/signin');
  }
  if (!user.level) {
    return res.redirect('/signin');
  }  
  if (user.role < 900) {
    return res.redirect('/signin');
  }
  next();  
};


