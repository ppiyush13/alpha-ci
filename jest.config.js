
module.exports = {
    "coverageDirectory": "./coverage-unit",
    "coverageReporters": [
        "lcov", 
        "text"
    ],
    "testMatch": [
        "**/src/__tests__/*.test.js",
    ],
    "collectCoverageFrom": [
        "src/**/*.{js,ts}",
        "!<rootDir>/node_modules/",
        "!<rootDir>/src/setupTests.js",
        "!<rootDir>/src/**/*.testUtil.js",
    ],
    "setupFiles": [
        "<rootDir>/src/setupTests.js"
    ]
};
