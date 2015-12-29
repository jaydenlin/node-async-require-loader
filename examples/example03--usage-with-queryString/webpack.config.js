"use strict";
var path = require("path"),

    webpack = require("webpack"),
    parameter = "en";

module.exports = {
    cache: true,
    entry: {
        test: "./examples/example03--usage-with-queryString/entry.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?queryString='" + parameter + "'"
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