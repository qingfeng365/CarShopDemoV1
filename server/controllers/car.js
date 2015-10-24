'use strict';
var _ = require('underscore');
var ModelCar = require('../models/car');

module.exports.showDetail = function(req, res, next) {
  var id = req.params.id;
  ModelCar.findById(id, function(err, car) {
    if (err) {
      return next(err);
    }
    res.render('car_detail', {
      title: '汽车商城 详情页',
      car: car
    });
  });
};

module.exports.showList = function(req, res, next) {
  ModelCar.fetch(function(err, cars) {
    if (err) {
      return next(err);
    }
    res.render('car_list.jade', {
      title: '汽车商城 列表页',
      cars: cars
    });
  });
};

module.exports.new = function(req, res, next) {
  res.render('car_admin', {
    title: '汽车商城 后台录入页',
    car: {}
  });
};
module.exports.update = function(req, res, next) {
  var id = req.params.id;
  ModelCar.findById(id, function(err, car) {
    if (err) {
      return next(err);
    }
    res.render('car_admin', {
      title: '汽车商城 后台录入页',
      car: car
    });
  });
};
module.exports.post = function(req, res, next) {
  var carObj = req.body.car;
  if (!carObj) {
    return res.status(400).send('找不到合法数据.');
  }
  var id = carObj._id;
  if (!id) {
    //新增
    var docCar = new ModelCar(carObj);
    docCar.save(function(err, _car) {
      if (err) {
        return next(err);
      }
      return res.redirect('/car/' + _car._id);
    });
  } else {
    //修改 方案一
    // ModelCar.findByIdAndUpdate(id, carObj, function(err, _car) {
    //   if (err) {
    //     return next(err);
    //   }
    //   return res.redirect('/car/' + id);
    // });

    //修改 方案二
    ModelCar.findById(id, function(err, docCar){
      if (err) {
        return next(err);
      }
      docCar = _.extend(docCar, carObj);
      docCar.save(function(err, _car) {
        if (err) {
          return next(err);
        }
        return res.redirect('/car/' + _car._id);
      });
    });
  }
};
module.exports.del = function(req, res, next) {
  var id = req.query.id;
  if (id) {
    ModelCar.findByIdAndRemove(id, function(err, _car) {
      if (err) {
        res.status(500).json({
          ok: 0
        });
        return next(err);
      } else {
        res.json({
          ok: 1
        });
      }
    });
  } else {
    res.json({
      ok: 0
    });
  }
};
