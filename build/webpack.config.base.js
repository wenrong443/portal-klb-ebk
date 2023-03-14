// Generated using webpack-cli http://github.com/webpack-cli
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const utils = require('./utils')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: '[name]',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': utils.resolve('src'),
            'views': utils.resolve('src/views'),
            'assets': utils.resolve('src/assets'),
            'seedwork': utils.resolve('src/infrastructure/seedwork'),
            'infrastructure': utils.resolve('src/infrastructure'),
            'model': utils.resolve('src/infrastructure/model'),
            '@components': utils.resolve('src/@components'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['vue-style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/i,
                use: ['vue-style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|ico)$/,
                type: 'asset',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.vue$/,
                use: {
                    loader: "vue-loader",
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'src/assets/favicon/favicon2.ico',
            inject: true
        }),
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        new Dotenv({
            // path: '../.env', // Path to .env file (this is the default)
            // safe: true, // load .env.example (defaults to "false" which does not use dotenv-safe)
        })
    ],
};
