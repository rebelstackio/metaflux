const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './lib/index.js',
	output: {
		filename: 'metaflux.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd'
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'test/browser_test')
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
				include: [
					/\/node_modules\/@rebelstack-io\/metaflux/
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/'
					}
				}]
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: ['file-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js'],
		modules: ['node_modules', 'lib']
	},
	node: {
		fs: 'empty'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'test/browser_test/index.html'),
			hash: false,
			filename: 'index.html',
			inject: 'body'
		})
	],
	devtool: 'source-map'
};
