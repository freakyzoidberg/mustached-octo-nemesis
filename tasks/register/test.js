module.exports = function (grunt) {
  grunt.registerTask('test', [
  'compileAssets',
  'linkAssets',
  'karma'
  ]);
};
