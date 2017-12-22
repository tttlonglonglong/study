const path = require('path');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");  //用来用做文件的分离
const HtmlWebpackPlugin = require('html-webpack-plugin') // 动态生成, 动态的引用打包的文件
const CleanWebpackPlugin = require('clean-webpack-plugin')


module.exports = {
	// entry: './src/index.js',
	entry: {
		app: './src/index.js',
		print: './src/print.js'
	},
	output: {
		// filename: 'bundle.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	// 插件
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		})
	],
}