'use strict';
var ModelCar = require('../models/car');

module.exports.index = function(req, res, next) {
  console.log('req.session');
  console.log(req.session);
  ModelCar.fetch(function(err, cars) {
    if (err) {
      return next(err);
    }
    res.render('index', {
      title: '汽车商城 首页',
      cars: cars
    });
  });
};
