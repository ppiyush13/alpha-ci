#!/usr/bin/env node

const path = require('path');

require('@babel/register')({
    root: path.join(__dirname, '..'),
    ignore: [/node_modules/]

});

require("./cli.js").createCli(process.argv);
