// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/* globals jake:false, desc:false, task:false, complete:false, fail:false, directory:false */

(function() {
	"use strict";

	var semver = require("semver");
	var jshint = require("simplebuild-jshint");
	var path = require("path");

	var karma = require("simplebuild-karma");
	var shell = require("shelljs");
	var jsx = require("./build/util/jsx_runner.js");
	var browserify = require("./build/util/browserify_runner.js");

	var GENERATED_DIR = "generated";
	var JSX_DIR = GENERATED_DIR + "/jsx";
	var BROWSERIFY_DIR = GENERATED_DIR + "/browserify";
	var COLLATED_CLIENT_DIR = GENERATED_DIR + "/client";
	var DEPLOY_DIR = GENERATED_DIR + "/deploy";

	var CLIENT_DIR = "src/client";
	// var VENDOR_DIR = "src/vendor";
	var VENDOR_DIR = DEPLOY_DIR + "/vendor";


	var KARMA_CONFIG = "karma.conf.js";

	directory(JSX_DIR);
	directory(BROWSERIFY_DIR);
	directory(COLLATED_CLIENT_DIR);
	directory(DEPLOY_DIR);

	desc("Delete generated files");
	task("clean", function() {
		jake.rmRf(GENERATED_DIR);
	});

	//**** General-purpose tasks

	desc("Start the Karma server (run this first)");
	task("karma", function() {
		console.log("Starting Karma server:");
		karma.start({
			configFile: KARMA_CONFIG
		}, complete, fail);
	}, { async: true });

	desc("Create deployable client files");
	task("build", [ DEPLOY_DIR, "browserify" ], function() {
		console.log("Building deploy directory: .");

		shell.rm("-rf", DEPLOY_DIR + "/*");
		shell.cp("-R", "src/client/*.html", BROWSERIFY_DIR + "/*", DEPLOY_DIR);
		shell.cp("-R", "src/client/vendor/*.js", VENDOR_DIR);
	});

	desc("Lint everything");
	task("lint", ["lintNode", "lintClientJs", "lintClientJsx"]);

	task("lintNode", function() {
		process.stdout.write("Linting Node.js code: ");
		jshint.checkFiles({
			files: [ "Jakefile.js", "src/*.js", "src/server/**/*.js", "build/util/**/*.js" ],
			options: nodeLintOptions(),
			globals: nodeLintGlobals()
		}, complete, fail);
	}, { async: true });

	task("lintClientJs", function() {
		process.stdout.write("Linting client-side JavaScript code: ");
		jshint.checkFiles({
			files: [ CLIENT_DIR + "/**/*.js", "!" + CLIENT_DIR + "/vendor/**/*" ],
			options: clientLintOptions(),
			globals: clientLintGlobals()
		}, complete, fail);
	}, { async: true });

	task("lintClientJsx", [ "compileJsx" ], function() {
		process.stdout.write("Linting JSX code: ");
		jshint.checkFiles({
			files: JSX_DIR + "/**/*.js",
			options: clientLintOptions(),
			globals: clientLintGlobals()
		}, complete, fail);
	}, { async: true });

	desc("Default build");
	task("default", [ "version", "lint", "test", "build" ], function() {
		console.log("\n\nBUILD OK");
	});

	desc("Run a localhost server");
	task("run", [ "build" ], function() {
		jake.exec("node node_modules/http-server/bin/http-server " + DEPLOY_DIR, { interactive: true }, complete);
	}, { async: true });

	desc("Erase all generated files");
	task("clean", function() {
		console.log("Erasing generated files: .");
		shell.rm("-rf", "generated");
	});


	//**** Supporting tasks

	desc("Check Node version");
	task("version", function() {
		console.log("Checking Node version: .");

		var packageJson = require("./package.json");
		var expectedVersion = packageJson.engines.node;

		var actualVersion = process.version;
		if (semver.neq(expectedVersion, actualVersion)) {
			fail("Incorrect Node version: expected " + expectedVersion + ", but was " + actualVersion);
		}
	});

	desc("Run tests");
	task("test", function() {
		console.log("Testing JavaScript:");
		karma.run({
			configFile: KARMA_CONFIG,
			expectedBrowsers: [
				"Firefox 45.0.0 (Linux 0.0.0)"
			],
			strict: !process.env.loose
		}, complete, fail);
	}, { async: true });

	task("compileJsx", [JSX_DIR], function() {
		process.stdout.write("Compiling JSX to JS: ");
		shell.rm("-rf", JSX_DIR + "/*");
		var pass = jsx.transformFiles(CLIENT_DIR, jsxFiles(), JSX_DIR);
		if (!pass) fail("JSX failed");
	});

	task("browserify", [ BROWSERIFY_DIR, "collateClient" ], function() {
		console.log("Bundling client JavaScript with Browserify: .");
		browserify.bundle(COLLATED_CLIENT_DIR + "/main.js", BROWSERIFY_DIR + "/bundle.js", complete, fail);
	}, { async: true });

	task("collateClient", [ COLLATED_CLIENT_DIR, "compileJsx" ], function() {
		process.stdout.write("Collating client-side JavaScript: .");
		shell.rm("-rf", COLLATED_CLIENT_DIR + "/*");
		shell.cp("-R", JSX_DIR + "/*", COLLATED_CLIENT_DIR);

		clientJsFiles().forEach(function(file) {
			process.stdout.write(".");
			var relativeFilename = "/" + file.replace(CLIENT_DIR + "/", "");
			shell.mkdir("-p", path.dirname(COLLATED_CLIENT_DIR + relativeFilename));
			shell.cp(CLIENT_DIR + relativeFilename, COLLATED_CLIENT_DIR + relativeFilename);
		});
		process.stdout.write("\n");
	});

	function jsxFiles() {
		return new jake.FileList(CLIENT_DIR + "/**/*.jsx").toArray();
	}

	function clientJsFiles() {
		return new jake.FileList(CLIENT_DIR + "/**/*.js").toArray();
	}

	function globalLintOptions() {
		return {
			bitwise: true,
			curly: false,
			eqeqeq: true,
			forin: true,
			immed: true,
			latedef: false,
			newcap: true,
			noarg: true,
			noempty: true,
			nonew: true,
			regexp: true,
			undef: true,
			strict: true,
			trailing: true
		};
	}

	function nodeLintOptions() {
		var options = globalLintOptions();
		options.node = true;
		return options;
	}

	function clientLintOptions() {
		var options = globalLintOptions();
		options.browser = true;
		options.newcap = false;
		return options;
	}

	function globalLintGlobals() {
		return {
			//Mocha/Expect globals
			beforeEach: false,
			afterEach: false,
			describe: false,
			it: false,
			expect: false
		};
	}

	function nodeLintGlobals() {
		return globalLintGlobals();
	}

	function clientLintGlobals() {
		var globals = globalLintGlobals();

		// CommonJs
		globals.exports = false;
		globals.require = false;
		globals.module = false;

		//React
		globals.React = false;

		return globals;
	}

}());
