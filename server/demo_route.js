'use strict';

var express = require('express');
var port = 4000;
var app = express();

app.listen(port);
console.log('路由测试服务已启动,监听端口号:' + port);

var showRoute = function(req, res) {
  console.log('================');
  console.log('当前生效的路由规则:');
  console.log(req.route.path);
  console.log('');

  console.log('req.route.methods');
  console.log(req.route.methods);
  console.log(''); 

  console.log('req.originalUrl');
  console.log(req.originalUrl);
  console.log(''); 

  console.log('req.body');
  console.log(req.body);
  console.log('');  

  console.log('req.cookies');
  console.log(req.cookies);
  console.log('');  


  console.log('req.hostname');
  console.log(req.hostname);
  console.log('');  


  console.log('req.ip');
  console.log(req.ip);
  console.log(''); 


  console.log('req.params');
  console.log(req.params);
  console.log(''); 

  console.log('req.path');
  console.log(req.path);
  console.log(''); 

  console.log('req.protocol');
  console.log(req.protocol);
  console.log(''); 

  console.log('req.query');
  console.log(req.query);
  console.log(''); 

  res.sendStatus(200);
};

app.get('/',showRoute);

/**
 *
 * http://localhost:4000/user/100/xyz/abcd?a=1&b=2&c[id]=100&c[name]=xxxx
 *
 * http://localhost:4000/user/100/xyz/abcd?a=1&b=2&c[id][a]=100&c[id][b]=xxxx
 */


app.get('/user/:id/xyz/:name',showRoute);
app.get('/user/:id/:name',showRoute);

app.get('/user/:id::name',showRoute);
app.get('/user/:id,:name',showRoute);
app.get('/user/:id;:name',showRoute);

app.get('/user/:id&:name',showRoute);
app.get('/user/:id-:name',showRoute);
app.get('/user/:id=:name',showRoute);

/**
 * 这种情况是有意义的, 适用于
 *
 * http://localhost:4000/user/1
 * http://localhost:4000/user/
 * 两种情况
 */
app.get('/user/:id?',showRoute);

/**
 * ? * + | 在多参数时不要使用 
 */
app.get('/user/:id,:name?',showRoute);
app.get('/user/:id,:name+',showRoute);
app.get('/user/:id,:name*',showRoute);

app.get('/user/:id|:name',showRoute);
app.get('/user/:id+:name',showRoute);
app.get('/user/:id?:name',showRoute);
app.get('/user/:id*:name',showRoute);

/**
 *
 * http://localhost:4000/abc/xyz
 * 
 */

app.get('/*',showRoute);