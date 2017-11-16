const path = require('path');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");  //用来用做文件的分离
const HtmlWebpackPlugin = require('html-webpack-plugin') // 动态生成, 动态的引用打包的文件
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
	// entry: './src/index.js',
	entry: {
		app: './05.HRM热模块替换/src/index.js',
		print: './05.HRM热模块替换/src/print.js'
	},
	devtool: 'inline-source-map',
	output: {
		// filename: 'bundle.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './05.HRM热模块替换/dist')
	},

	// 插件
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
	],
}