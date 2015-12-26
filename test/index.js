var assert = require('assert');
require('shelljs/global');

describe('Test the built result of the remote content ', function() {
	it('[example 01] when contents is the pure js, should return correct js using the required .ajs file', function() {

		rm('-rf', './examples/example01/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example01/webpack.config.js --content-base examples/example01/');
		var distModule = require('../examples/example01/dist/js/test.js');

		assert.equal(typeof distModule, "object");
	});

	it('[example 02] when contents is the react template, should return correct js using the required .ajs file', function() {

		rm('-rf', './examples/example02/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example02/webpack.config.js --content-base examples/example02/')
		var distModule = require('../examples/example02/dist/js/test.js');
		assert.equal(typeof distModule, "object");
	});

	it('[example 03] when contents is the pure js with queryString to get, should return correct js using the required .ajs file', function() {

		rm('-rf', './examples/example03/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example03/webpack.config.js --content-base examples/example03/')
		var distModule = require('../examples/example03/dist/js/test.js');
		assert.equal(typeof distModule, "object");
	});

	it('[example 04] when contents is the react template with queryString to get, should return correct js using the required .ajs file', function() {

		rm('-rf', './examples/example04/dist/');
		exec('node node_modules/webpack/bin/webpack.js -p --config examples/example04/webpack.config.js --content-base examples/example04/')
		var distModule = require('../examples/example04/dist/js/test.js');
		assert.equal(typeof distModule, "object");
	});
});