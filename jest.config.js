module.exports = {
    coverageReporters: [
        'html',
        'text',
    ],
    testMatch: [
        '**/src/__tests__/*.test.js',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,ts}',
        '!<rootDir>/node_modules/',
        '!<rootDir>/src/setupTests.js',
        '!<rootDir>/src/testUtils/*',
    ],
    setupFiles: [
        '<rootDir>/src/setupTests.js',
    ],
};
