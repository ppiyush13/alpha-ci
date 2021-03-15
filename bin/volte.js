#!/usr/bin/env node

const esmRequire = require("esm")(module/*, options*/)
esmRequire("./cli.js").createCli(process.argv);
