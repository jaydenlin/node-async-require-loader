var assert = require('assert');
require('shelljs/global');
var fs = require("fs");
var path = require("path");

describe('Test the built result of the remote content ', function() {
	it('[example 01] when contents is the pure js, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example01--basic-usage/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example01--basic-usage/webpack.config.js --content-base examples/example01--basic-usage/');
		var content = fs.readFileSync(path.join(__dirname, '../examples/example01--basic-usage/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('o.exports=function(){console.log("Hello World From Web")}'), -1);
	});

	it('[example 02] when contents is the react template, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example02--usage-with-preParser-rt/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example02--usage-with-preParser-rt/webpack.config.js --content-base examples/example02--usage-with-preParser-rt/');
		var content = fs.readFileSync(path.join(__dirname, '../examples/example02--usage-with-preParser-rt/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('e.exports=function(){return r.createElement("div",{},r.createElement("h3",{},"Hello World Form Web"))'), -1);
	});

	it('[example 03] when contents is the pure js with queryString to get, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example03--usage-with-queryString/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example03--usage-with-queryString/webpack.config.js --content-base examples/example03--usage-with-queryString/')
		var content = fs.readFileSync(path.join(__dirname, '../examples/example03--usage-with-queryString/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('o.exports=function(){console.log("Hello USA From Web")'), -1);
	});

	it('[example 04] when contents is the react template with queryString to get, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example04--usage-with-preParser-rt-and-queryString/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example04--usage-with-preParser-rt-and-queryString/webpack.config.js --content-base examples/example04--usage-with-preParser-rt-and-queryString/')
		var content = fs.readFileSync(path.join(__dirname, '../examples/example04--usage-with-preParser-rt-and-queryString/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('e.exports=function(){return r.createElement("div",{},r.createElement("h3",{},"Hello USA Form Web"))'), -1);
	});

	it('[example 05] when custom preParser is set, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example05--usage-with-preParser/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example05--usage-with-preParser/webpack.config.js --content-base examples/example05--usage-with-preParser/')
		var content = fs.readFileSync(path.join(__dirname, '../examples/example05--usage-with-preParser/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('e.exports=function(){console.log("Replaceed by custom preParser!")'), -1);
	});

	it('[example 08] when contents is the react template, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example08--usage-with-preParser-multiple-rt/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example08--usage-with-preParser-multiple-rt/webpack.config.js --content-base examples/example08--usage-with-preParser-multiple-rt/');
		var content = fs.readFileSync(path.join(__dirname, '../examples/example08--usage-with-preParser-multiple-rt/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('e.exports.A=function(){return r.createElement("h3",{}," Hello World Form Web A ")}'), -1);
		assert.notEqual(content.indexOf('e.exports.B=function(){return r.createElement("h3",{}," Hello World Form Web B ")}'), -1);
	});

	it('[example 09] when contents is the react template, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example08--usage-with-preParser-multiple-rt/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example08--usage-with-preParser-multiple-rt/webpack.config.js --content-base examples/example09--usage-with-preParser-multiple-rt/');
		var content = fs.readFileSync(path.join(__dirname, '../examples/example08--usage-with-preParser-multiple-rt/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('e.exports.A=function(){return r.createElement("h3",{}," Hello World Form Web A ")}'), -1);
		assert.notEqual(content.indexOf('e.exports.B=function(){return r.createElement("h3",{}," Hello World Form Web B ")}'), -1);
	});
});

describe('Test the built result of the local content ', function() {
	it('[example 06] when contents is the pure js, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example06--usage-with-local/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example06--usage-with-local/webpack.config.js --content-base examples/example06--usage-with-local/');
		var content = fs.readFileSync(path.join(__dirname, '../examples/example06--usage-with-local/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('o.exports=function(){console.log("Hello World From Local")}'), -1);
	});

	it('[example 07] when contents is the react template, should return correct js using the required .ajs file', function() {
		this.timeout(50000);
		rm('-rf', './examples/example07--usage-with-preParser-rt-local/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example07--usage-with-preParser-rt-local/webpack.config.js --content-base examples/example07--usage-with-preParser-rt-local/');
		var content = fs.readFileSync(path.join(__dirname, '../examples/example07--usage-with-preParser-rt-local/dist/js/test.js'), {
			encoding: "utf-8"
		});
		assert.notEqual(content.indexOf('e.exports=function(){return r.createElement("div",{},r.createElement("h3",{},"Hello World Local"))'), -1);
	});
});