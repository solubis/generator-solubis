
var path = require('path');
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/app.js'],
        common: [],
    },
    output: {
        path: './build/',
        publicPath: '/',
        filename: '[name].js'
    },
    cache: false,
    debug: false,
    resolve: {
        extensions: ['', '.ts', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts' },
            { test: /\.(png|jpg|gif)$/, loader: 'url' },
            { test: /\.jsx?$/, loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0'],
                    cacheDirectory: true,
                    plugins: [
                        'transform-runtime',
                        ["transform-react-jsx", {"pragma": "element"}]
                    ]
                },
                exclude: /node_modules/,
            },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') },
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