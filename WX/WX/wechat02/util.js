/**
 * Created by Administrator on 2017/12/23.
 */
"user strict"

var xml2js = require('xml2js')
var Promise = require('bluebird')
var tpl = require('./tpl')

exports.parseXMLAsync = function(xml){
    return new Promise(function(resolve, reject) {
        xml2js.parseString(xml, {trim: true}, function(err, content){
            if(err) reject(err)
            else  resolve(content)
        })
    })
};

// 把对象中的数组打印出来, 把对象中的对象大一出来
function formatMessage(result){
    var message = {};
    if(typeof result === 'object'){
        var keys = Object.keys(result);
        for(var i=0;i<keys.length;i++){
            var key = keys[i];
            var item = result[key];
            if(!(item instanceof Array) || item.length === 0) continue;
            if (item.length === 1){
                var val = item[0];
                if (typeof val === 'object') message[key] = formatMessage(val);
                else message[key] = (val || '').trim();
            }else{
                message[key] = [];
                for(var j=0,k=item.length;j<k;j++) message[key].push(formatMessage(item[j]));
            }
        }
    }
    return message;
}

exports.formatMessage = formatMessage;

exports.tpl = function (content, message) {
    var info = {};  //临时存储回复的内容
    var type = 'text';
    var fromUserName = message.FromUserName;
    var toUserName = message.ToUserName;

    if (Array.isArray(content)){ // 若果content是一个数组的话, 我们就认为是一个图文消息, 微信:  图文消息才是数组
        type = 'news'
    }
    console.log('模板传入的content', content);
    console.log('模板传入的message', message);
    type = content.type || type;  //传了type就用传的,  没有用传的就用默认的
    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = type;
    info.toUserName = toUserName;
    info.fromUserName = fromUserName;

    return tpl.compiled(info)
}