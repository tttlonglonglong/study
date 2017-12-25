'use strict'

var Koa = require('koa') //我们用的是koa框架，所以先要把koa给导进来
//var path = require('path') //我们用文件来存储access_token所以需要把path模块导入进来


var wechat = require('./wechat02/g') //这个是微信获取access_token的代码逻辑

var config = require('./config')
var weixin = require('./weixin')

var app = new Koa()//实例化框架

//function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，
//它返回一个  Generator  对象。
//你也可以定义 生成器函数  使用构造函数  GeneratorFunction 和一个  function* expression 。

app.use(wechat(config.wechat, weixin.reply))//调用中间件，来实现里面的微信逻辑, 微信的reply就相当于hander
app.listen(1234);
console.log('Listening:1234');