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
        '!<rootDir>/src/setup-tests.js',
        '!<rootDir>/src/test-utils/*',
    ],
    setupFiles: [
        '<rootDir>/src/setup-tests.js',
    ],
};
