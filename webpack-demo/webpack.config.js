const path = require('path');
 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './04.开发环境/src/index.js',
        print: './04.开发环境/src/print.js'
    },
    devtool: 'inline-source-map',
    // devServer: {
    //     contentBase: './04.开发环境/dist'
    // },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Development'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    }
};
 
// const ExtractTextPlugin = require("extract-text-webpack-plugin");  //用来用做文件的分离
const HtmlWebpackPlugin = require('html-webpack-plugin') // 动态生成, 动态的引用打包的文件
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
	// entry: './src/index.js',
	entry: {
		app: './05.HRM热模块替换/src/index.js',
		// print: './05.HRM热模块替换/src/print.js'
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './05.HRM热模块替换/dist',
		hot: true
	},
	output: {
		// filename: 'bundle.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './05.HRM热模块替换/dist')
	},
	module: {
		rules:[{
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	},
	// 插件
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: '05. HRM热模块替换'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
}
 
