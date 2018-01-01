const express = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');


const isDev = process.env.NODE_ENV === 'development';


const app = express();


if (!isDev) {
    // node使用的是commonjs规范, 默认不会读export default的内容,  不是ecs6的import , 会默认度export default的内容
    // node文件是一个对象, 文件中的export是对象的属性或者方法
    const serverEntry = require('../dist/server-entry').default;

    // 非开发环境才会存在这个文件
    // server端要把生成的html文件读进来, 要指定格式, 以utf8来读
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8');

    // 区分什么路径返回服务端的内容, 什么路径返回服务端的代码
    app.use('/public', express.static(path.join(__dirname, '../dist')));

    // 截获浏览器发出的任何请求, 返回服务端渲染的js
    app.get('*', function (Req, res) {
        const appString = ReactSSR.renderToString(serverEntry);
        console.log('appString', appString);
        res.send(template.replace('<!-- app -->', appString))
    });
} else{
    const devStatic = require('./utils/dev-static');
    devStatic(app)
}


app.listen(3333, function () {
    console.log('server is listening on 33333')
})