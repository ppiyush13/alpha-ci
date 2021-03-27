/**
 * Inspired from https://github.com/facebook/jest/blob/master/scripts/mapCoverage.js
 * Also follow https://github.com/facebook/jest/issues/2418
 */

const { createContext } = require('istanbul-lib-report');
const { create: createReport } = require('istanbul-reports');
const { createCoverageMap } = require('istanbul-lib-coverage');

const unitCoverage = require('../coverage-unit/coverage-final.json');
const e2eCoverage = require('../coverage-e2e/coverage-final.json');

/** configs */
const configs = {
    coverageDir: 'coverage-istanbul',
    reporter: ['text', 'html'],
};

/** create coverage map */
const coverageMap = createCoverageMap();

/** merge coverages */
coverageMap.merge(e2eCoverage);
coverageMap.merge(unitCoverage);

const context = createContext({ coverageMap, dir: configs.coverageDir });

configs.reporter.forEach(reporter => 
    createReport(reporter, {}).execute(context)
);
