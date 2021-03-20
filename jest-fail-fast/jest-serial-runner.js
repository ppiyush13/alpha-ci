
const TestRunner = require('jest-circus/runner');

module.exports = class SerialRunner extends TestRunner {
    constructor(...attr) {
        super(...attr)
        this.isSerial = true
    }
}
