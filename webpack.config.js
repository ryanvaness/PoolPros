const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
    const devMode = env.env !== 'production';
    return {
        entry: './src/app.js',
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
                }

            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/src/index.html'
            }),
            new MiniCssExtractPlugin('app.css')
        ]
    };
};