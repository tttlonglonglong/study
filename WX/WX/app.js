'use strict'

var Koa = require('koa') //我们用的是koa框架，所以先要把koa给导进来
var path = require('path') //我们用文件来存储access_token所以需要把path模块导入进来



//在这里我们需要新建一个文件夹config，里面新建一个wechat.txt
var wechat_file = path.join(__dirname, './config/wechat.txt');
var wechat = require('./wechat02/g') //这个是微信获取access_token的代码逻辑
var util = require('./libs/util') //这个辅助代码的实现


var config = {
    wechat: {
        appID: "wxbf781923a92bbd7d",
        appSecret: "d0e968327f6a3d18cad874212f0f4aa4",
        token: "tuHong",
        getAccessToken: function () {
            //通过这个来实现获取access_token
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken: function (data) {
            data = JSON.stringify(data)
            //通过这个来保存access_token
            return util.writeFileAsync(wechat_file, data)
        }
    }
}
var app = new Koa()//实例化框架

//function* 这种声明方式(function关键字后跟一个星号）会定义一个生成器函数 (generator function)，
//它返回一个  Generator  对象。
//你也可以定义 生成器函数  使用构造函数  GeneratorFunction 和一个  function* expression 。

app.use(wechat(config.wechat))//调用中间件，来实现里面的微信逻辑
app.listen(1234);
console.log('Listening:1234');