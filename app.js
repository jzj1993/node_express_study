var express = require('express');
var path = require('path');
var marked = require('marked');
var fs = require('fs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(express.static(__dirname + '/public'));

var renderer = new marked.Renderer();

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/index', function(req, res){
  res.render('index', {
    title: 'ExpressTitle'
  });
});

app.engine('md', function(path, options, fn){
  fs.readFile(path, 'utf8', function(err, str){
    if (err) return fn(err);
    str = marked(str);
    fn(null, str);
  });
});

app.get('/blog/:title.html', function(req, res, next) {
  var urlPath = ['blog/', req.params.title, '.md'].join('');
  console.log(urlPath);
  var filePath = path.normalize('./views/' + urlPath);
  console.log('filePath = ' + filePath);
  fs.stat(filePath, function(err, stat) {
    if(err == null) {
      res.render(urlPath, {layout: false});
    } else {
      next();
    }
  });
});

app.get('*', function(req, res) {
  res.render('404', {
    status: 404,
    title: '404 Not Found',
  });
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});

// Express 程序配置
// app.configure(function(){
  // app.set('views', __dirname + '/views');
  // // app.set('view engine', 'jade');
  // app.use(express.bodyParser());
  // app.use(express.methodOverride());
  // app.use(app.router);
  // app.use(express.static(__dirname + '/public'));
// });


/*********** _ref ***********/

// var express = require('express');
// var path = require('path');
// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// module.exports = app;
