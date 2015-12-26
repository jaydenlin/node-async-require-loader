var loaderUtils = require('loader-utils');
var fetchUrl = require("fetch").fetchUrl;
var __ = require("lodash");

module.exports = function(content) {
    this.cacheable && this.cacheable();
    this.value = content;

    var callback = this.async();
    var query = loaderUtils.parseQuery(this.query);

    //////////////////////
    //Set up the pre parser
    ///////////////////////

    //Check the custom preparser first
    var preParser = __.get(this.options, 'NodeAsycRequirePreParser[' + query.preParser + ']');

    //If there if no custom preParser then check the offical preParsers
    if (typeof preParser === "undefined") {
        switch (query.preParser) {
            case "rt":
                preParser = require("./preParser/reactTemplate.js");
                break;
            default:
                preParser = function(rawContent) {
                    return rawContent;
                };
        }
    }
    //////////////////////////////////////////////
    //Set up the node module url with queryString
    /////////////////////////////////////////////
    var queryString = query.queryString || "";
    var nodeModleUrl = content.trim() + queryString.replace(/'/gi, ""); //trim the contents and remove the ''

    //Do the aync fetch and return
    console.log("Remote Node Module Url:" + nodeModleUrl);

    fetchUrl(nodeModleUrl, function(err, meta, body) {
        var rawContent = body.toString();
        callback(null, "module.exports = " + JSON.stringify(preParser(rawContent)));

    });

}