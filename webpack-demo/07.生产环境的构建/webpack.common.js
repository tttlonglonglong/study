const path = require('path')
const CleanWebpackPlugin = require('clearn-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	plugins: {
		new CleanWebpackPlugin('./dist'),
		new HtmlWebpackPlugin({
			title: '07. 构建生产环境'
		})
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}