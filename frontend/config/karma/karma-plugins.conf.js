module.exports = [
  require('karma-jasmine'),
  require('karma-junit-reporter'),
  require('karma-chrome-launcher'),
  require('karma-jasmine-html-reporter'),
  require('karma-coverage-istanbul-reporter'),
  require('karma-sabarivka-reporter'),
  require('@angular-devkit/build-angular/plugins/karma')
];