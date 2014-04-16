var karma = require('karma');


module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    datetime: Date.now(),
    karma: {
        unit: {
            configFile: 'config/karma.conf.js'
        },
        unitc9: {
            configFile: 'config/karma.conf.c9.js'
        }
    }
  });
 
  grunt.loadNpmTasks('grunt-karma');
 
  // Default task.
  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('test-c9', ['karma:unitc9']);
};