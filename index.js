 "use strict";
 var loaderUtils = require('loader-utils');
 var __ = require("lodash");
 var path = require("path");
 var _eval = require("eval");
 var requestSync = require("sync-request");
 var fs = require("fs");


 module.exports = function(content) {

     var that = this;
     var query = loaderUtils.parseQuery(this.query);
     var async = (typeof(query.async) !== 'undefined') ? query.async: true;

     try {
         content = _eval(content);
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

     //If there if no custom preParser then check the offical preParsers
     if (typeof preParser === "undefined") {
         switch (query.preParser) {
             case "rt":
                 preParser = require("./preParser/reactTemplate.js");
                 break;
             case "multipleRts":
                 preParser = require("./preParser/multipleReactTemplates.js");
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
     var nodeModuleUrl = content.remoteUrl.trim() + queryString.replace(/'/gi, ""); //trim the contents and remove the ''

     if (async) {
         //Do the aync fetch and return
         console.log("Remote Node Module Url:" + nodeModuleUrl);
         var res = requestSync('GET', nodeModuleUrl);
         var rawContent = res.getBody('utf8');
         var source;
         if(typeof(query.useUnescape)!=="undefined" && query.useUnescape){
            source = preParser(rawContent, true);
         }else{
            source = preParser(rawContent);
         }
         that.callback(null, source);

     } else {
         //load local file
         var rawContent = fs.readFileSync(content.localPath, {
             encoding: 'utf8'
         });

         var source = preParser(rawContent);
         that.resourcePath = content.localPath;
         that.resource = content.localPath;
         that.callback(null, source);

     }


 };