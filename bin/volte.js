#!/usr/bin/env node

const { program } = require('commander');
const pkgDir = require('pkg-dir');
const path = require('path');
const { version, main: entryPath } = require('../package.json');

/** derive absolute path of package entry */
const alphaEntryPath = path.resolve(pkgDir.sync(__dirname), entryPath);

/** require entry point module */
// eslint-disable-next-line import/no-dynamic-require
const { executeAlpha } = require(alphaEntryPath);

/** compose options using commander */
program
    .version(version, '-v, --version', 'version')
    .action(() => executeAlpha())
    .parse(process.argv);
