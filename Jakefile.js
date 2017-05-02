// Copyright (c) 2015 Titanium I.T. LLC. All rights reserved. For license, see "README" or "LICENSE" file.
/* globals jake:false, desc:false, task:false, complete:false, fail:false, directory:false */

(function() {
	"use strict";

	var semver = require("semver");
	var jshint = require("simplebuild-jshint");
	var karma = require("simplebuild-karma");
	var shell = require("shelljs");
	var jsx = require("./build/util/jsx_runner.js");

	var GENERATED_DIR = "generated";
	var JS_DIR = GENERATED_DIR + "/js";
	var KARMA_CONFIG = "karma.conf.js";
	var DIST_DIR = "generated/dist";

	directory(JS_DIR);

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

	desc("Lint everything");
	task("lint", ["lintNode", "lintClient"]);

	task("lintNode", function() {
		process.stdout.write("Linting Node.js code: ");
		jshint.checkFiles({
			files: ["Jakefile.js", "src/javascript/**/*.js"],
			options: nodeLintOptions(),
			globals: nodeLintGlobals()
		}, complete, fail);
	}, { async: true });

	task("lintClient", ["compileJsx"], function() {
		process.stdout.write("Linting browser code: ");
		jshint.checkFiles({
			files: [ JS_DIR + "/**/*.js"],
			options: browserLintOptions(),
			globals: browserLintGlobals()
		}, complete, fail);
	}, { async: true });

	desc("Default build");
	task("default", [ "version", "lint", "test", "build" ], function() {
		console.log("\n\nBUILD OK");
	});

	desc("Run a localhost server");
	task("run", [ "build" ], function() {
		jake.exec("node node_modules/http-server/bin/http-server " + DIST_DIR, { interactive: true }, complete);
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

	// desc("Lint JavaScript code");
	// task("lint", function() {
	// 	process.stdout.write("Linting JavaScript: ");
	//
	// 	jshint.checkFiles({
	// 		files: [ "Jakefile.js", "src/javascript/**/*.js" ],
	// 		options: lintOptions(),
	// 		globals: lintGlobals()
	// 	}, complete, fail);
	// }, { async: true });

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

	desc("Build distribution directory");
	task("build", [ DIST_DIR ], function() {
		console.log("Building distribution directory: .");

		shell.rm("-rf", DIST_DIR + "/*");
		shell.cp("src/client/*", DIST_DIR);

		jake.exec(
			"node node_modules/browserify/bin/cmd.js src/javascript/app.js -o " + DIST_DIR + "/bundle.js",
			{ interactive: true },
			complete);
	}, { async: true });

	task("compileJsx", [JS_DIR], function() {
		process.stdout.write("Compiling JSX to JS: ");
		var pass = jsx.transformFiles(jsxFiles(), JS_DIR);
		if(!pass) fail("JSX failed");
	});

	function jsxFiles() {
		var files = new jake.FileList();
		files.include("src/client/**.jsx");
		return files.toArray();
	}

	directory(DIST_DIR);

	function globalLintOptions() {
		return {
			bitwise: true,
			curly: false,
			eqeqeq: true,
			forin: true,
			immed: true,
			latedef: false,
			newcap: false,
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

	function browserLintOptions() {
		var options = globalLintOptions();
		options.browser = true;
		return options;
	}

	function nodeLintGlobals() {
		return {
			//Mocha globals
			beforeEach: false,
			afterEach: false,
			describe: false,
			it: false
		};
	}

	function browserLintGlobals() {
		return {
			React: false
		};
	}





}());
