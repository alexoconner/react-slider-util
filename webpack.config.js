/**
 * webpack config
 *
 */
var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        './lib/index.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel?presets[]=urban']
            }
        ]
    }
};
