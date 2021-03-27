#!/usr/bin/env node
const { program } = require('commander');
const package = require('../package.json');
const { require: rootRequire } = require('app-root-path');
const { executeAlpha } = rootRequire(package.main);

program
    .version(package.version, '-v, --version', 'version')
    .action(() => executeAlpha())
    .parse(process.argv);
