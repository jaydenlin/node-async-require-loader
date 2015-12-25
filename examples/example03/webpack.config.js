"use strict";
var path = require("path"),

    webpack = require("webpack"),
    parameter = "tw";

module.exports = {
    cache: true,
    entry: {
        test: "./examples/example03/entry.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?queryString='?country=" + parameter + "'"
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