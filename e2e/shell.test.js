import shell from 'shelljs';
import './jest-shell';

describe('testing shell output', () => {
    it('should return true', () => {

        expect(shell.exec('npm dist-tag demo-pkg --registry http://localhost:13130')).toMatchShellOutput(`
            latest-1:   1.3.1
            latest-2:   2.1.0
            latest-3:   3.0.3
            latest:     3.1.0
            next:       3.1.0
        `);
    });

    it('negative test case', () => {

        expect(shell.exec('npm dist-tag unknown --registry http://localhost:13130')).toMatchShellError(`
            npm ERR! 404 Not Found - GET http://localhost:13130/-/package/unknown/dist-tags - no such package available
        `);

        expect(shell.exec('npm dist-tag demo-pkg --registry http://localhost:13130')).not.toThrowOnShell();

    });

});

