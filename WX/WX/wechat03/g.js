'use strict'


var sha1 = require('sha1');

var Wechat = require('./wechat')


module.exports = function (opts) {
    var wechat = new Wechat(opts);//我们实例化一下Wechat，就可以在中间件中直接调用了
    return function *(next) {
        console.log(this.query)
        var token = opts.token;
        var signature = this.query.signature;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var echostr = this.query.echostr;
        var str = [token, timestamp, nonce].sort().join('');
        var sha = sha1(str);
        if (sha === signature) {
            this.body = echostr + '';
        }
        else {
            this.body = 'wrong';
        }
    }
}