"use strict";

var grunt = require("grunt");

exports.webpcss = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read("tmp/default_options.css");
    var expected = grunt.file.read("test/expected/default_options.css");
    test.equal(actual, expected, "should describe what the default behavior is.");

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read("tmp/custom_options.css");
    var expected = grunt.file.read("test/expected/custom_options.css");
    test.equal(actual, expected, "should describe what the custom option(s) behavior is.");

    test.done();
  }
};
