var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
/**
 * [后端源文件数组]
 * @type {Array}
 */
var scripts = [
  'server/**/*.js',
  'client/js/**/*.js'
];

var nodemonConfig = {
  script: 'server/app.js',
  ext: 'js jade',
  ignore: [
    'node_modules/**',
    'client/**'
  ],
  env: {
    NODE_ENV: 'development'
  }
};

/**
 * [description]
 * @param  {[type]} done)    {             browserSync({    proxy: "localhost:3000",      port: 5000,      notify: true  } [description]
 * @param  {[type]} done);} [description]
 * @return {[type]}          [description]
 */
gulp.task('browser-sync', ['nodemon'], function(done) {
  browserSync({
    proxy: "localhost:3000", //项目端口 
    port: 5000,  // 浏览器访问端口
    notify: true
  }, done);
});

/**
 * [description]
 * @param  {[type]} cb)    {                   var           called [description]
 * @param  {[type]} 1000);               });} [description]
 * @return {[type]}        [description]
 */
gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon(nodemonConfig)
    .on('start', function() {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function() {
      setTimeout(function() {
        console.log('-------- 重启 --------');
        reload({
          stream: false
        });
      }, 1000);
    });
});

/**
 * [description]
 * @param  {[type]} ) {             return gulp.src(paths.scripts)    .pipe(jshint())    .pipe(jshint.reporter('jshint-stylish'));} [description]
 * @return {[type]}   [description]
 */
gulp.task('lint', function() {
  return gulp.src(scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch(scripts, ['lint']);
});

/**
 * [默认执行的任务]
 */
gulp.task('default', ['browser-sync','watch']);

/**
 * [description]
 * @param  {[type]} ){	gulp.watch(serverPath, f)}          [description]
 * @return {[type]}                            [description]
 */
// gulp.task('watch',[], function(){
// 	gulp.watch(serverPath, function(event){
// 		console.log(event.path + ':' + event.type + ' ...');
// 	});
// });
