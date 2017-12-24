'use strict'
var sha1 = require('sha1');
var contentType = require('content-type')
var getRawBody = require('raw-body')

var Wechat = require('./wechat')
var util = require('./util')
module.exports = function (opts) {
    var wechat = new Wechat(opts);//我们实例化一下Wechat，就可以在中间件中直接调用了
    return function *(next) {

        var that = this

        console.log('this.query', this.query)
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);

        console.log('this.method',this.method);
        // 过滤掉微信验证的get请求
        if(this.method === "GET"){
            if (sha === signature) {
                this.body = echostr + '';
            }
            else {
                this.body = 'wrong';
            }
        }
        else if(this.method === "POST") {
            if (sha !== signature) {
                console.log('post.signature !== signature');
                this.body = 'wrong';
                return false
            }

            console.log('enter-Post', 'this.length',this.length);
            // yield 获得异步post请求过来的数据, raw-body 获得原始的 XML 数据
            var data = yield  getRawBody(this.req, {
                length:this.req.headers['content-length'], //post过来的数据长度
                limit: '1mb',
                encoding: contentType.parse(this.req).parameters.charset
            });


            console.log('this.XML.data', data.toString())

            var content = yield util.parseXMLAsync(data)
            console.log('content', content)

            var message = util.formatMessage(content.xml);
            console.log('message', message)

            this.weixin = message;  //挂载消息

            yield handler.call(this,next);   //转到业务层逻辑

            wechat.replay.call(this);  //真正回复
        }


    }
};