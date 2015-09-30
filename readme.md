# Node Express学习

本项目为一个基于Node Express的简易Markdown博客。

- 支持Markdown自动渲染(使用marked渲染)
- 支持代码高亮(使用highlight.js渲染)

## 用法

将博客的md文件保存在`/blog/`目录下，例如`/blog/index.md`，运行下面的指令启动服务器
```
$ node app.js
```

输入`http://localhost:3000/index.html`即可访问该博客。URL中的`index.html`对应`/blog/name.md`文件。

> 主要参考资料：
http://witcheryne.iteye.com/blog/1172069
