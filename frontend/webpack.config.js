const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputDir = path.resolve(__dirname, "../dist");

console.log(outputDir);

const webpackOption = {
    entry: "./src/index.js",
    output: {
        path: outputDir,
        filename: "[name].[chunkhash].js",
    },
    devtool: 'source-map', //"cheap-module-eval-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-loader"
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                //loader: ExtractTextPlugin.extract('css'),
                //use: ['style-loader', 'css-loader'],
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            chunks: ['main', 'vendors'],
            hash: true,
        }),
        ...['css', 'img', 'fonts', 'js'].map(type => new CopyWebpackPlugin([{
            context: __dirname + "/static/" + type + "/",
            from: '**/*',
            to: outputDir + "/" + type + "/"
        }]))
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
      }
};

module.exports = webpackOption;