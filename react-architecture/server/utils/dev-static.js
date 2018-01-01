const axios = require('axios');
const path = require('path');
const webpack = require('webpack');
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')


const serverConfig = require('../../build/webpack.config.server');


// 去webpack的服务里面去读取template, 因为本地的地址是一定的
const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const Module = module.constructor;

const mfs = new MemoryFs();
const serverCompiler = webpack(serverConfig);
let serverBundle

serverCompiler.outputFileSystem = mfs; // 内存读写比硬盘读写快很多

// 监听, 文件内容变化的时候, 都会执行这个方法
serverCompiler.watch({}, (err, stats) => {
    // stats: webpack打包后生成的内容
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(warnings))

    // 获取server-bundle的信息
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf-8');
    const m = new Module();
    m._compile(bundle, 'server-entry.js'); //用module 去解析JavaScript--string的内容, 一定要指定module的名字
    serverBundle =  m.exports.default;
    console.log(' m',  m, '\r \n ---m',m, 'm. m.exports.default',   m.exports.default)
})
module.exports = function (app) {

    app.get('*', function (req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle);
            console.log('content', content)
            res.send(template.replace('<!-- app -->', content))
        })
    })
};