module.exports = {
  dir: require('path').join(__dirname, '../../coverage'),
  reports: ['html', 'lcovonly', 'text-summary', 'cobertura'],
  fixWebpackSourcePaths: true
};