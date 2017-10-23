const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		//  index: './src/index.js',
		app: './src/index.js',
		print: './src/print.js'
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Output Management'
		}),
		new HtmlWebpackPlugin({  // Also generate a test.html
			filename: 'test.html',
			chunksSortMode: function() {console.log(arguments)},
			hash: true
		  })
	],
	output: {
		// filename: 'bundle.js',
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
	}
}