const ParentEnvironment = require('jest-environment-node');

module.exports = class JestEnvironmentFailFast extends ParentEnvironment {
    failedTest = false;
    
    async handleTestEvent(event, state) {
        console.log(event);
        if (event.name === 'hook_failure' || event.name === 'test_fn_failure') {
            this.failedTest = true;
        } else if (this.failedTest && event.name === 'test_start') {
            event.test.mode = 'skip';
        }
        else if(event.name === 'run_describe_finish') {
            this.failedTest = false;
        }

        if (super.handleTestEvent) {
            super.handleTestEvent(event, state)
        }
    }
}
