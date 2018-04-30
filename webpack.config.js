const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
require('babel-polyfill');

module.exports = (env) => {
    const devMode = env.env !== 'production';
    return {
        entry: ['babel-polyfill', './src/app.js'],
        devtool: 'source-map',
        output: {
            filename: 'app.js',
            path: path.join(__dirname, "/dist")
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    ],
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    loader: 'file-loader?name=./assets/fonts/[name].[ext]'
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html'
            }),
            new MiniCssExtractPlugin('app.css'),
            new CopyWebpackPlugin([ { from: 'src/assets', to: 'assets' } ])
        ]
    };
};
