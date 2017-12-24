'use strict';
//引入模块
var fs = require('fs')//因为我们需要对文件来进行操作，所以导入fs模块
var Promise = require('bluebird')


//读取票据信息
exports.readFileAsync = function (fpath, encoding) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fpath, encoding, function (err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}
//写入票据信息
exports.writeFileAsync = function (fpath, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(fpath, content, function (err, content) {
            if (err) reject(err)
            else resolve()
        })
    })
}