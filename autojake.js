#!/usr/local/bin/node

(function() {
  "use stict";

  var gaze = require("gaze");
  var spawn = require("child_process").spawn;

  var WATCH = "src/**/*.js";

  var COMMAND = "./jake.sh";
  var COMMAND_ARGS = [];

  var buildRunning = false;

  gaze(WATCH, function(err, watcher) {
    console.log("Will run " + COMMAND + " when " + WATCH + " changes.");
    watcher.on("all", run);
    run();

    function run(evt, filepath) {
      if (buildRunning) return;
      buildRunning = true;

      console.log("\n> " + COMMAND + " " + COMMAND_ARGS.join(" "));
      var jake = spawn(COMMAND, COMMAND_ARGS, { stdio: "inherit" });

      jake.on("exit", function(code) {
        buildRunning = false;
      });
    }
  });

}());
