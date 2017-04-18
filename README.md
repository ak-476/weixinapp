my-vue
===

## 使用
```js
  npm install //下载依赖的文件
	npm start //开发模式
```
访问[http://localhost:8081]
启动*npm start* 

如果开始服务器开发联调，注册掉service.js中

```js
	npm run build //发布生产
```
产物在build目录下；如果生产静态资源路径不为根目录需要修复配置文件；否则懒加载模块会存在路径不正确无法使用；


## 目录结构
```
	./
    |--- assets 静态资源
    |--- page   页面级脚本
    |--- mock 	mock数据的文件；
    |--- components  组件级脚本
    |--- App.vue vue.js 主入口文件
    |--- index.html app 入口
    |--- main.js  app入口脚本 也是webpack的入口文件
    |--- webpack.config.js //开发使用webpack文件
    
```
