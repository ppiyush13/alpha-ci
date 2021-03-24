import expect from 'expect';
import escapeStringRegex from 'escape-string-regexp';

const normalizeStr = str => str.replace(/\s/g, '').toLowerCase();

const isSimilar = (str1, str2) => {
    const got = normalizeStr(str1);
    const exp = normalizeStr(str2);
    const expRegExp = new RegExp(escapeStringRegex(exp), 'i');
    return expRegExp.test(got);
};

const toMatchShellOutput = (shellOutput, expected) => {
    const {stdout, stderr, code} = shellOutput; 

    if(code !== 0) {
        throw new Error(stderr);
    }
    const received = stderr + stdout;

    return isSimilar(received, expected)
        ? { pass: true, message: () => `Expected ${expected} to not be similar to ${received}` }
        : { pass: false, message: () => `Expected ${expected} to be similar to ${received}` };
};

const toEqualShellOutput = (shellOutput, expected) => {
    const {stdout, stderr, code} = shellOutput; 

    if(code !== 0) {
        throw new Error(stderr);
    }
    const received = stdout;

    return normalizeStr(stdout) === normalizeStr(expected)
        ? { pass: true, message: () => `Expected ${expected} to not be equal to ${received}` }
        : { pass: false, message: () => `Expected ${expected} to be equal to ${received}` };

};

const toMatchShellError = (shellOutput, expected = '') => {
    const {stdout, stderr, code} = shellOutput;
    if(code === 0) {
        return {
            pass: false,
            message: () => `Expected shell command to throw but passed with outcome:\n${stdout}`,
        };
    }

    return isSimilar(stderr, expected)
        ? { pass: true, message: () => `Expected ${expected} to not be similar to error ${stdout}` }
        : { pass: false, message: () => `Expected ${expected} to be similar to error ${stdout}` };

};

expect.extend({
    toMatchShellOutput,
    toEqualShellOutput,
    toMatchShellError,
    toThrowOnShell: toMatchShellError,
});
