
var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/app.js', 'webpack-dev-server/client?http://localhost:3000'],
        common: [],
    },
    output: {
        path: './build/',
        publicPath: '/',
        filename: '[name].js'
    },
    cache: true,
    debug: false,
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts' },
            { test: /\.(png|jpg|gif)$/, loader: 'url' },
            { test: /\.jsx?$/, loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                    cacheDirectory: true,
                    plugins: ['transform-runtime']
                },
                exclude: /node_modules/,
            },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap') },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[\s\S]+)?$/, loader: 'url' }
        ]
    },
    devServer: {
        contentBase: './'
    },
    plugins: [
        new ExtractTextPlugin("[name].css", { allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin('common', '[name].js')
    ]
};