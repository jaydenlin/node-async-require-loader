"use strict";
var path = require("path"),

    webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        test: "./examples/example01--basic-usage/entry.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader"
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