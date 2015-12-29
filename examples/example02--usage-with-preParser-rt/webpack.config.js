"use strict";
var path = require("path"),

    webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        test: "./examples/example02--usage-with-preParser-rt/entry.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?preParser=rt"
        }]
    },
    plugins: [


    ],
    externals: {

    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};