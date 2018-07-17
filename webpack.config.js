const path = require('path');

module.exports = {
	entry: './lib/index.js',
	output: {
		filename: 'metaflux.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'umd'
	},
	node: {
		fs: 'empty'
	}
};
