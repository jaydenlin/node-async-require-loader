"use strict";
var path = require("path"),

    webpack = require("webpack");

module.exports = {
    cache: true,
    entry: {
        test: "./examples/example08--usage-with-preParser-multiple-rt/entry.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?preParser=multipleRts&useUnescape=true"
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