// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadlessNoSandbox'],
    coverageIstanbulReporter: require('./config/karma/karma-istanbul.conf.js'),
    coverageReporter: require('./config/karma/karma-sabarivka.conf.js'),
    customLaunchers: require('./config/karma/karma-custom-launchers.conf.js'),
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    junitReporter: require('./config/karma/karma-junit.conf.js'),
    logLevel: config.LOG_INFO,
    plugins: require('./config/karma/karma-plugins.conf.js'),
    reporters: ['progress', 'kjhtml', 'junit', 'sabarivka'],
    restartOnFileChange: true
  });
};
