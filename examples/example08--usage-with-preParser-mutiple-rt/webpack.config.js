"use strict";
var path = require("path"),

    webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        test: "./examples/example08--usage-with-preParser-mutiple-rt/entry.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?preParser=mutipleRts"
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