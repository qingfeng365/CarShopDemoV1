'use strict';

var ModelCar = require('./models/car');

module.exports = function(app) {
  app.get('/', function(req, res, next) {
    ModelCar.fetch(function(err, cars) {
      if (err) {
        return next(err);
      }
      res.render('index', {
        title: '汽车商城 首页',
        cars: cars
      });
    });
  });

  app.get('/car/:id', function(req, res, next) {
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
  });

  app.get('/admin/car/list', function(req, res, next) {
    ModelCar.fetch(function(err, cars) {
      if (err) {
        return next(err);
      }
      res.render('car_list.jade', {
        title: '汽车商城 列表页',
        cars: cars
      });
    });
  });

  app.get('/admin/car/new', function(req, res) {
    res.render('car_admin', {
      title: '汽车商城 后台录入页',
      car: {}
    });
  });

  app.get('/admin/car/update/:id', function(req, res, next) {
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
  });

  app.post('/admin/car', function(req, res, next) {
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
      //修改
      ModelCar.findByIdAndUpdate(id, carObj, function(err, _car) {
        if (err) {
          return next(err);
        }
        return res.redirect('/car/' + id);
      });
    }
  });

  // /admin/list?id=xxxxx

  app.delete('/admin/list', function(req, res, next) {
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
  });
};
