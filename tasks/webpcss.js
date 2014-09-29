/*
 * grunt-webpcss
 * https://github.com/lexich/grunt-webpcss
 *
 * Copyright (c) 2014 Efremov Alexey
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	var _ = require('lodash');
	var webpcss = require('webpcss');

	grunt.registerMultiTask('webpcss', 'Process css file to generate addition css ruless to add webp compatble"', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			baseClass:'.webp',
			replace_from:/\.(png|jpg|jpeg)/,
			replace_to:'.webp'
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// Read file source.
				var data = grunt.file.read(filepath);
				return webpcss.transform(data, options);
			}).join('\n');


			// Write the destination file.
			grunt.file.write(f.dest, src);

			// Print a success message.
			grunt.log.writeln('File "' + f.dest + '" created.');
		});
	});

};
