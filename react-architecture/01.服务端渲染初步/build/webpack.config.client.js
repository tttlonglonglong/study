// path 完成绝对路径的书写
const path = require('path');

const HTMLPlugin = require('html-webpack-plugin');
module.exports = {
    //   入口, 形成依赖树
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    // 输出的名字, 路径
    output: {
        //filename下的变量: name: entry下面对应的文件的名字,
        filename: '[name].[hash].js',
        // 输出文件引用路径
        path: path.join(__dirname, '../dist'),
        // 静态资源引用的时的路径, js,css  //  空的: app.hash.js   /public/app.hash,js
        // 它能够帮我们区分: 我们这个url是静态资源还是,api 请求之类的, 静态资源是要部署到cdn上面的话, public-path直接写cdn的前缀级可以了
        publicPath: '/public'
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
    plugins: [
        new HTMLPlugin({
            //dist: 中生成的tamplate 会以 template.html 为模板
            template: path.join(__dirname, '../client/template.html')
        })
    ]

}
// 空的: app.hash.js   /public/app.hash,js