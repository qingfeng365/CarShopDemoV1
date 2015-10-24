'use strict';

var mongoose = require('mongoose');

var ModelUser = require('./models/user');

mongoose.connect('mongodb://localhost/carShop');

var adminUserArray = [{
	name:'admin',
	password:'admin',
	level:900
},{
	name:'superadmin',
	password:'superadmin',
	level:999
}];

ModelUser.create(adminUserArray,function(err, users){
  if(err){
    console.log(err);
  }else{
    console.log('新增 %d 条记录', users.length);
  }
  mongoose.disconnect();
});