var loaderUtils = require('loader-utils');
var fetchUrl = require("fetch").fetchUrl;
var __ = require("lodash");
var fs = require("fs");

module.exports = function(content) {
    this.cacheable && this.cacheable();
    this.value = content;

    var callback = this.async();
    var query = loaderUtils.parseQuery(this.query);
    var async = (typeof(query.async)!=='undefined')? query.async:true;
    var content;
    try {
      content = eval(content);
    } catch (e) {
      throw new Error('The .ajs file is not a valid js. ' + e.toString());
    }

    if (Object.prototype.toString.call(content) !== '[object Object]') {
      throw new Error('The .ajs file does not return a valid json');
    } else if (typeof content.remoteUrl === "undefined") {
      throw new Error('The .ajs file must return a remoteUrl');
    }
    //////////////////////
    //Set up the pre parser
    ///////////////////////

    //Check the custom preparser first
    var preParser = __.get(this.options, 'NodeAsycRequirePreParser[' + query.preParser + ']');

    // if(typeof(query.async)!=='undefined' && !query.async){

    // }
    

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
    var nodeModleUrl = content.remoteUrl.trim() + queryString.replace(/'/gi, ""); //trim the contents and remove the ''
    //Do the aync fetch and return
    console.log("Remote Node Module Url:" + nodeModleUrl);


    if(async){
        fetchUrl(nodeModleUrl, function(err, meta, body) {
            var rawContent = body.toString();
            // callback(null, "module.exports = " + JSON.stringify(preParser(rawContent)));

            callback(null, preParser(rawContent));

        });    
    }else{
        fs.readFile(content.localPath, function (err, data){
            callback(null, preParser(data));
        });
        
    }
    

}