"use strict";

/*
 * grunt-webpcss
 * https://github.com/lexich/grunt-webpcss
 *
 * Copyright (c) 2015 Efremov Alexey
 * Licensed under the MIT license.
 */
var _ = require("lodash"),
    webpcss = require("webpcss");

module.exports = function(grunt) {
  grunt.registerMultiTask("webpcss", "Process css file to generate addition css ruless to add webp compatble", function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      baseClass:".webp",
      replace_from:/\.(png|jpg|jpeg)/,
      replace_to:".webp"
    });

    var done = _.after(this.files.length, this.async());

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn("Source file \"" + filepath + "\" not found.");
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join("\n");

      webpcss.transform(src, options)
        .then(function(res) {
          // Write the destination file.
          grunt.file.write(f.dest, res);

          // Print a success message.
          grunt.log.writeln("File \"" + f.dest + "\" created.");
          done();
        })
        .catch(done);
    });
  });
};
