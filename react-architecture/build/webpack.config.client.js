// path 完成绝对路径的书写
const path = require('path');

// 因为hot-module这个包是webpack里面的, 我们需要把这个包引用进来
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'
const config = {
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
        publicPath: '/public/'
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
            template: path.join(__dirname, '../client/template.html'),
            inject: true
        })
    ]
}

// 空的: app.hash.js   /public/app.hash,js

// contentBase, 我们在dist 目录下面去启动了webpack.devServer这个服务, 这个服务的整个环境实在dis目录下面的
if(isDev){
    //entry:  是一个数组, 代表我们的这个entry包含很多的 引用文件, 它会给我们打包到同一个文件里面去
    config.entry = {
        app: [
            'react-hot-loader/patch',// 客户端热更新代码需要用到的内容
            path.join(__dirname, '../client/app.js')
        ]
    },


        config.devServer = {
        //'localhost/127.0.0.1'也可以, 但是别人无法访问
        host: '0.0.0.0',
        port: '8888',
        // 指定访问编译后的静态文件目录
        contentBase: path.join(__dirname, '../dist'),
        // 热跟新
        hot: true,
        // 编译过程出现错误, 出现一个黑色的背景, 只出现error, warning就忽略了
        overlay: {
            errors: true
        },
        // 设置webpack-dev的publicPath,
        // 访问我们的所有的静态文件, 前面都要加上都要加上publicPath, 才能访问到我们的静态文件
        publicPath: '/public/',
        // 设置index,  所有404的请求返回index.html
        historyApiFallback: {
            index: '/public/index.html'
        },
    }

    config.plugins.push(new webpack.HotModuleReplacementPlugin)
}
module.exports = config