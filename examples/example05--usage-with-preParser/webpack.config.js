"use strict";
var path = require("path"),

    webpack = require("webpack");


module.exports = {
    cache: true,
    entry: {
        test: "./examples/example05--usage-with-preParser/entry.js"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: "/",
        filename: 'js/[name].js'
    },
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?preParser=anyNameYouWant"
        }]
    },
    NodeAsycRequirePreParser: {
        anyNameYouWant: function(remoteRawContent) {
            // replace by your own contents
            remoteRawContent = "module.exports=function(){ console.log('Replaceed by custom preParser!');}";
            return remoteRawContent;
        }
    },
    plugins: [


    ],
    externals: {

    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};