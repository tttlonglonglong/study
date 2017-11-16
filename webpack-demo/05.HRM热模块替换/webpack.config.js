const path = require('path');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");  //用来用做文件的分离
const HtmlWebpackPlugin = require('html-webpack-plugin') // 动态生成, 动态的引用打包的文件
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')


module.exports = {
	// entry: './src/index.js',
	entry: {
		// print: './src/print.js'
		// app: './src/index.js',
		app: './src/index.js'

	},
	output: {
		// filename: 'bundle.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/', //外部访问输出文件夹的路径
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true
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
			title: '04 开发配置'
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
}