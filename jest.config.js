module.exports = {
    "coverageDirectory": "./coverage-unit",
    "coverageReporters": [
        "json",
        "lcov"
    ],
    "testMatch": [
        "**/src/__tests__/*test.js"
    ],
    "collectCoverageFrom": [
        "src/**/*.{js,ts}",
        "!<rootDir>/node_modules/",
        "!<rootDir>/src/setupTests.js"
    ],
    "setupFiles": [
        "<rootDir>/src/setupTests.js"
    ]
};