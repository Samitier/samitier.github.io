const   webpack = require('webpack'),
        path = require('path'),
        HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: "./src/js/main.js"
    },
    output: {
        path: __dirname + "/bin",
        publicPath: '/',
        filename: "index.js"
    },
    resolve: {
        extensions: ['.js', ".css"]
    },
    devtool: "source-map",
    plugins:[
        new HtmlWebpackPlugin({ 
            template: './src/index.html', 
            hash: true,
            path: "./",
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader', 
                query: { 
                    presets: ['es2015'], 
                    cacheDirectory: true
                }
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    devServer: {
        disableHostCheck: true
    }
}