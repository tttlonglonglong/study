// const express = require('express');
// const webpack = require('webpack')
// const webpackDevMiddleware = require('webpack-dev-middleware');

// const app = express()
// const config = require('./webpack.config.js');
// const compiler = webpack(config);


// // 告诉express使用 中间容器和webpack配置
// // 并且将构建的目录作为访问的基本目录
// app.use(webpackDevMiddleware(compiler, {
// 	publicPath: config.output.publicPath
// }))

// // 开启的端口
// app.listen(3000, function () { 
// 	console.log("正在监听端口 3000")
	
// })
const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const config = require('./webpack.config')
const options = {
	contentBase: './dist',
	hot: true,
	host: 'localhost'
}

// HRM 这里用的服务器是webpackDevServer的
webpackDevServer.addDevServerEntrypoints(config, options);
const complier = webpack(config)
const server= new webpackDevServer(complier, options);

server.listen(5000, 'localhost', ()=> {
	console.log('dev server listen on port 5000')
})
