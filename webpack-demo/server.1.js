const express = require('express');
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express()
const config = require('./webpack.config.js');
const compiler = webpack(config);


// 告诉express使用 中间容器和webpack配置
// 并且将构建的目录作为访问的基本目录
app.use(webpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath
}))

// 开启的端口
app.listen(3000, function () { 
	console.log("正在监听端口 3000")
	
})