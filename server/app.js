var express = require('express');
var port = 3000;
var app = express();

app.set('views', __dirname + '/views/pages');
app.set('view engine', 'jade');

app.get('/', function(req,res){
	res.render('index',{
		title: '汽车商城 首页'
	});
});

app.get('/car/:id', function(req,res){
	res.render('car_detail',{
		title: '汽车商城 详情页'
	});
});

app.get('/admin/car/list', function(req,res){
	res.render('car_list.jade',{
		title: '汽车商城 列表页'
	});
});

app.get('/admin/car/new', function(req,res){
	res.render('car_admin',{
		title: '汽车商城 后台录入页'
	});
});

app.get('/admin/car/update/:id', function(req,res){
	res.render('car_admin',{
		title: '汽车商城 后台录入页'
	});
});

app.listen(port);

console.log("汽车商城网站服务已启动,监听端口号:"+port);