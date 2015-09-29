#Node Express

## 配置
```
$ sudo npm install -g express-generator
```

> `Error: Cannot find module 'express'`解决：
`vim ~/.bash_profile`
```
export NODE_PATH=/usr/local/lib/node_modules/
```
`source ~/.bash_profile`

## 创建工程

> 参考
http://expressjs.jser.us/guide.html

`package.json`

```json
{
  "name": "hello-world",
  "description": "hello world test app",
  "version": "0.0.1",
  "private": true,
  "dependencies": {
    "body-parser": "~1.13.2",
    "cookie-parser": "~1.3.5",
    "debug": "~2.2.0",
    "express": "~4.13.1",
    "jade": "~1.11.0",
    "morgan": "~1.6.1",
    "serve-favicon": "~2.3.0",
  }
}
```

运行`npm install`自动安装所有依赖模块到当前目录。

## app.js

```js
var express = require('express');

var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
```

## jade view engine

`app.js`
```js
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/index', function(req, res){
  res.render('index', {
    title: 'ExpressTitle'
  });
});
```

`./views/layout.jade`

```jade
doctype html
html
  head
    title= title
  body
    block content
```

`./views/index.jade`

```jade
extends layout

block content
  h1= title
  p Welcome to #{title}
```

## Markdown-js

`package.js`

```json
{
  "dependencies": {
    "markdown-js": ">= 0.0.1"
  }
}
```

```
$ npm install
```

`app.js`

```js
var markdown = require('markdown-js');

app.get('/markdown', function(req, res) {
    var html = markdown.makeHtml("[Baidu](http://www.baidu.com/ \"Click\") ");
    res.send(html);
    res.end();
});
```

