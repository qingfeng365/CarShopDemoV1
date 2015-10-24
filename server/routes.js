'use strict';

var indexController = require('./controllers/index');
var carController = require('./controllers/car');
var userController = require('./controllers/user');

module.exports = function(app) {
  app.get('/', indexController.index);

  app.get('/car/:id', carController.showDetail);

  app.get('/admin/car/list', carController.showList);

  app.get('/admin/car/new', carController.new);

  app.get('/admin/car/update/:id', carController.update);

  app.post('/admin/car', carController.post);

  // /admin/list?id=xxxxx
  app.delete('/admin/list', carController.del);

  app.get('/signup', userController.showSignup);
  app.post('/signup', userController.postSignup);

};
