import shell from 'shelljs';

shell.config.fatal = true;
shell.config.verbose = true;

/** clean remove coverage dir */
shell.rm('-rf', './coverage');

/** create coverage dir */
shell.mkdir('./coverage');

/** copy unit/coverage-final.json to coverage dir */
shell.cp('./coverage-unit/coverage-final.json', './coverage/coverage-unit.json');

/** copy e2e/coverage-final.json to coverage dir */
shell.cp('./coverage-e2e/coverage-final.json', './coverage/coverage-e2e.json');

/** merge and create merged-coverage.json */
shell.exec('npx nyc merge coverage coverage/merged-coverage.json');

/** generate report for merged-coverage.json */
shell.exec('npx nyc --require @babel/register report -t coverage --report-dir coverage --reporter=html --reporter=text');


/**
 * I have also tried solutions mentioned here
 *     - https://github.com/facebook/jest/blob/master/scripts/mapCoverage.js
 *     - https://github.com/facebook/jest/issues/2418
 * 
 * Pros: Faster, simple, maintainable
 * Cons: Sequence of coverage merge matters, if first unit coverage is merged then e2e, it causes issue
 */
