const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = {
    //context: path.resolve(__dirname, ""),
    target: 'web',
    mode: 'development',
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[query]bundle-[name].js?[chunkhash]',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }, {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new webpack.optimize.SplitChunksPlugin({
            name: 'manifest'
        })
    ],
};

module.exports = config;