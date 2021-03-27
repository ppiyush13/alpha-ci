#!/usr/bin/env node

const { program } = require('commander');
const { version, main: entryPath } = require('../package.json');
const { require: rootRequire } = require('app-root-path');
const { executeAlpha } = rootRequire(entryPath);

program
    .version(version, '-v, --version', 'version')
    .action(() => executeAlpha())
    .parse(process.argv);
