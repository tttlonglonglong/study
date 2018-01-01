// path 完成绝对路径的书写
const path = require('path')

//const HTMLPlugin = require('html-webpack-plugin');
module.exports = {
    // js打包出来的内容他是使用在哪个执行环境当中的 web/node
    target: 'node',
    //   入口, 形成依赖树
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    // 输出的名字, 路径
    output: {
        //filename下的变量: name: entry下面对应的文件的名字,
        // 服务端没有缓存的概念, 不需要hash, 需要node.js去import这个js, 要给一个确定的名字 名字自己都读不过来没法import
        filename: 'server-entry.js',
        // 输出文件引用路径
        path: path.join(__dirname, '../dist'),
        // 静态资源引用的时的路径, js,css  //  空的: app.hash.js   /public/app.hash,js
        // 它能够帮我们区分: 我们这个url是静态资源还是,api 请求之类的, 静态资源是要部署到cdn上面的话, public-path直接写cdn的前缀级可以了
        publicPath: '/public',
        // 打包出来的js, 使用的模块化的方案, umd/cmd/amd/commomJS/global
        // commomjs2: 最新的commonjs 加载方案
        libraryTarget: 'commonjs2'
    },
    // 进行loader的一些配置, 是一个数组, 里面有很多的loader
    module: {
        rules: [
            {
                // test: 哪些文件要进行处理
                test: /.(jsx)$/,
                loader: 'babel-loader'
            },
            // nodeModule: 下面都是js代码, 不需要编译了
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, '../node_module')
                ]
            }
        ]
    },
    // 服务端不需要这个html文件
    //plugins: [
    //    new HTMLPlugin()
    //]

}
// 空的: app.hash.js   /public/app.hash,js