/*
 * grunt-webpcss
 * https://github.com/lexich/grunt-webpcss
 *
 * Copyright (c) 2014 Efremov Alexey
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var postcss = require('postcss');
  var _ = require('lodash');
  
  
  grunt.registerMultiTask('webpcss', 'Process css file to generate addition css ruless to add webp compatble"', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      baseClass:'.webp',
      replace_from:/\.(png|jpg|jpeg)/,
      replace_to:'.webp'
    });

    var proc = postcss(function(css){      
      var nodes = [];
      css.eachDecl(function(rule, data) {
        if(rule.prop.match(/^background/) && rule._value.match(/url/) ){
          var selector = "";
          var selectors = rule.parent.selector.split(',');
          for(var index in selectors){
            if(!!selector){
              selector += ", ";
            }
            selector += options.baseClass + " " + selectors[index].trim();
          }
          var rx = options.replace_from;
          if(!_.isRegExp(options.replace_from)){
            rx = new RegExp(rx);
          }
          
          var value = rule._value.replace(rx,options.replace_to);
          var new_rule = postcss.rule({selector:selector});
          new_rule.append({
            prop: rule.prop,
            value: value
          });
          nodes.push(new_rule);
        }
      });
      for(var n=0; n < nodes.length; n++){
        css.append(nodes[n]);
      }
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
        return proc.process(data).css;
      }).join('\n');


      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
