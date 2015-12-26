var loaderUtils = require('loader-utils');
var fetchUrl = require("fetch").fetchUrl;

module.exports = function(content) {
    this.cacheable && this.cacheable();
    this.value = content;

    var callback = this.async();
    var query = loaderUtils.parseQuery(this.query);


    /*Set up the pre parser before return*/
    var preParser;
    switch (query.preParser) {
        case "rt":
            preParser = require("./preParser/reactTemplate.js");
            break;
        default:
            preParser = function(rawContent) {
                return rawContent;
            };
    }

    console.log(preParser);

    var queryString = query.queryString || "";
    var nodeModleUrl = content.trim() + queryString.replace(/'/gi, "");

    /*Do the aync fetch and return*/
    console.log(nodeModleUrl);
    fetchUrl(nodeModleUrl, function(err, meta, body) {
        var rawContent = body.toString();
        callback(null, "module.exports = " + JSON.stringify(preParser(rawContent)));

    });

}