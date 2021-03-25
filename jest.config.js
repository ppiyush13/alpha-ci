
module.exports = {
    testMatch: [
        "**/src/__tests__/*test.js"
    ],
    coverageDirectory: './coverage-unit',
    coverageReporters: ['json', 'lcov'],
    collectCoverageFrom: [
        "src/**/*.{js,ts}",
        "!<rootDir>/node_modules/",
        '!<rootDir>/src/setupTests.js',
    ],
    setupFiles: [
        '<rootDir>/src/setupTests.js',
    ],
};
