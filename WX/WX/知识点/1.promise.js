


var fs = require('fs')
var Promise = require('bluebird')



//1.回调的方式处理异步, 目的是要保证函数顺序
function writeFileAsync(fpath, data, cb){
    fs.writeFile(fpath, data, function(){
        cb(err)
    })
}


function writeFileAsync(fpath, data) {
    return new Promise(function(resolve, reject){
        fs.writeFile(fpath, data, function(err){
            if (err) reject(err);
            else resolve()
            })
    })
}