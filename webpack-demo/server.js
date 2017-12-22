const express = require('express');
const webapck = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express();
const config = require('./webpack.config.js')
const complier = webapck(config)

// 告诉express编译的时候使用config, 构造的基本目录是 './'
app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}))

app.listen(3000, function(){
    console.log('Example app listening on port 3000!\n')
})