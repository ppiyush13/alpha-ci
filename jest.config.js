
module.exports = {
    // transform: {
    //     '.js': 'jest-esm-transformer',
    // },
    "testMatch": ["**/src/__tests__/*test.js"],
    "collectCoverageFrom": [
        "src/**/*.{js,ts}",
        "!<rootDir>/node_modules/"
    ],
};
