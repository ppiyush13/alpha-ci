module.exports = {
    //testRunner: './jest-serial-runner.js',
    testRunner: 'jest-circus/runner',
    testEnvironment: './jest-fail-fast-env.js',
    "maxWorkers": 1,
    "testMatch": [
        //"**/e2e/e2e.jest.test.js",
        "**/e2e/jes.test.js",
        "**/src/__tests__/*.test.js",
    ],
    "setupFiles": [
        "<rootDir>/src/setupTests.js"
    ]
};
