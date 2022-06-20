exports.config = {
    directConnect: true,
    framework: 'jasmine',
    capabilities: {
    browserName: 'chrome',
    acceptInsecureCerts : true,
    },
    specs: ['e2e-tests.js']
    };