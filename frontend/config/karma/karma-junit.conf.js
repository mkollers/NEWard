module.exports = {
  outputDir: 'coverage', // results will be saved as $outputDir/$browserName.xml
  outputFile: 'junit.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
  suite: '', // suite will become the package name attribute in xml testsuite element
  useBrowserName: false, // add browser name to report and classes names
  nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
  classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
  properties: {} // key value pair of properties to add to the <properties> section of the report
};
