var express = require('express');
var marked = require('marked');
var path = require('path');
var fs = require('fs');

var app = express();

app.use(express.static('public'));

// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight: function(code){
    return require('highlight.js').highlightAuto(code).value;
  }
});

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/index', function(req, res){
  res.render('index', {
    title: 'Index'
  });
});

app.get('/blog/:title.html', function(req, res, next) {
  var urlPath = ['blog/', req.params.title, '.md'].join('');
  console.log(urlPath);
  var filePath = path.normalize('./views/' + urlPath);
  console.log('filePath = ' + filePath);
  fs.stat(filePath, function(err, stat) {
    if(err == null) {
      var title = null;
      var h1_title = null;
      var content = fs.readFileSync(filePath, 'utf8');
      var html_content = marked(content);
      var ss = new String(html_content);
      var s = ss.indexOf('<h1');
      var e = ss.indexOf('</h1>');
      if(s >= 0 && e > s) {
        var text = ss.substring(s, e);
        title = text.substring(text.indexOf('>')+1);
        h1_title = null;
      } else {
        h1_title = title = filePath + " - Blogs";
      }

      res.render('blog', {
        title: title,
        h1_title: h1_title,
        blog_content: html_content
      });
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
