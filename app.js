var express = require('express');
var marked = require('marked');
var path = require('path');
var fs = require('fs');

// 设置Markdown参数
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

var app = express();

// 静态文件保存位置
app.use(express.static('public'));

// 使用jade作为模板引擎
app.set('views', 'views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/index', function(req, res){
  res.render('index', {
    title: 'Index'
  });
});

app.get('/:title.html', function(req, res, next) {
  var urlPath = ['blog/', req.params.title, '.md'].join('');
  console.log(urlPath);
  var filePath = path.normalize('./views/' + urlPath);
  console.log('filePath = ' + filePath);
  fs.stat(filePath, function(err, stat) {
    if(err == null) {
      // Markdown渲染
      var content = fs.readFileSync(filePath, 'utf8');
      var html_content = marked(content);
      // 提取Markdown中的h1作为文章标题
      var title = null;
      var h1_title = null;
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
      // 用jade渲染并输出页面
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
