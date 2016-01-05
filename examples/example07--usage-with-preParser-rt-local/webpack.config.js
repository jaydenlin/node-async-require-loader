"use strict";
var path = require("path"),
    webpack = require("webpack");


module.exports = {
    cache: true,
    entry: {
        test: "./examples/example07--usage-with-preParser-rt-local/entry.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?async=false&preParser=rt"
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