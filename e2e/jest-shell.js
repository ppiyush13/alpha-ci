import expect from 'expect';

const normalizeStr = str => str.replace(/\s/g, '').toLowerCase();

const toMatchShellOutput = (shellOutput, expected) => {
    const {stdout, stderr, code} = shellOutput; 

    if(code !== 0) {
        throw new Error(stderr);
    }
    const got = normalizeStr(stdout);
    const exp = normalizeStr(expected);
    const expRegExp = new RegExp(exp, 'i');
    const pass = expRegExp.test(got);

    return pass
        ? { pass, message: () => `Expected ${expected} to not be similar to ${stdout}` }
        : { pass, message: () => `Expected ${expected} to be similar to ${stdout}` };

};

const toMatchShellError = (shellOutput, expected = '') => {
    const {stdout, stderr, code} = shellOutput;
    if(code === 0) {
        return {
            pass: false,
            message: () => `Expected shell command to throw but passed with outcome:\n${stdout}`,
        };
    }

    const got = normalizeStr(stderr);
    const exp = normalizeStr(expected);
    const expRegExp = new RegExp(exp, 'i');
    const pass = expRegExp.test(got);

    return pass
        ? { pass, message: () => `Expected ${expected} to not be similar to error ${stdout}` }
        : { pass, message: () => `Expected ${expected} to be similar to error ${stdout}` };

};

expect.extend({
    toMatchShellOutput,
    toMatchShellError,
    toThrowOnShell: toMatchShellError,
});
