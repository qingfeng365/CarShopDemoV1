'use strict';

var express = require('express');
var port = 3000;
var app = express();
var path = require('path');
var _ = require('underscore');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/carShop');
var db = mongoose.connection;
db.on('error', function(err){
  console.error('mongoose 连接错误: ' + err.message + ' (' + err.name + ')');
});

  // console.error.bind(console, 'mongoose 错误信息:'));

var ModelCar = require('./models/car');

var morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client')));

app.locals.moment = require('moment');

app.set('views', __dirname + '/views/pages');
app.set('view engine', 'jade');

app.locals.pretty = true;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));


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


app.listen(port);

// require('express-debug')(app, {
//   depth: 10,
//   panels: ['locals', 'request', 'session', 'template', 'software_info', 'nav']
// });

console.log('汽车商城网站服务已启动,监听端口号:' + port);

var errorhandler = require('errorhandler');
app.use(errorhandler);
