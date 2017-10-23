const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'dirname/[name][hash:7].[ext]',
							// name: 'dirname222/[sha512:hash:base64:7].[ext]',
							// name: 'dirname333/[111][hash:7].[ext]?[hash]', // 最后的hash值没有用
							outputPath: 'images/',
							zemitFile: false
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							// optipng.enabled: false will disable optipng
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// the webp option will enable WEBP
							webp: {
								quality: 75
							}
						}
					},
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '/[name].[ext]',
							// name: 'dirname222/[sha512:hash:base64:7].[ext]',
							// name: 'dirname333/[111][hash:7].[ext]?[hash]', // 最后的hash值没有用
							outputPath: 'font/',
						 
						}
					}
				]
			},
			// {
			// 	test: /\.(png|jpg|gif)$/,
			// 	use: [
			// 		{
			// 			loader: 'url-loader',
			// 			options: {
			// 				limit: 51200
			// 			}
			// 		}
			// 	]
			// },
			{
				test: /\.(csv|tsv)$/,
				use: [
					'csv-loader'
				]
			},
			{
				test: /\.xml$/,
				use:[
					'xml-loader'
				]
			}
		]
	}
};