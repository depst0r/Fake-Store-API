const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',

    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        port: 3000,
        open: true,
        hot: true,
        liveReload: true,
        watchFiles: ['src/**/*.html', 'src/**/*.scss', 'src/**/*.js'],
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },

    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
        })
    ]
};