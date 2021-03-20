import shell from 'shelljs';
import mockedEnv from 'mocked-env';
import { path as rootPath } from 'app-root-path';
import expect from 'expect';
import './jest-shell';
import test from './test-runner';
import { start, stop } from './verdaccio-local/fork';

shell.config.silent = true;

test('Testing alpha end-2-end', ({ step, setup, tear}) => {

    setup(async () => {
        await start();
    });

    tear(async () => {
        await stop();
        shell.cd(rootPath);
        shell.rm('-rf', './app/demo-pkg');
    });

    step('cd to rootDir', () => {
        shell.cd(rootPath);
    });

    step('publish volte', () => {
        expect(shell.exec('npm publish --registry http://localhost:13130/')).toMatchShellOutput(
            `npm notice === Tarball Details ===
             npm notice name: volte`
        );
    });

    step('create demo-pkg', () => {
        shell.cp('-r', './app/test-pkg-template', './app/demo-pkg');
    });

    step('cd to demo-pkg', () => {
        shell.cd('./app/demo-pkg'); 
    });

    step('npm login test user', () => {
        const user = 'volte';
        const pass = 'pass1234';
        const email = 'test@example.com';
        const registry = 'http://localhost:13130';
        const configPath = './demo-pkg/.npmrc';
        shell.exec(`npx npm-cli-login -u ${user} -p ${pass} -e ${email} -r ${registry} --config-path=${configPath}`);
    });

    step('exec dist-tag, should return package not found error',  () => {
        expect(shell.exec('npm dist-tag demo-pkg')).toMatchShellError(
            `npm ERR! 404 Not Found - GET http://localhost:13130/-/package/demo-pkg/dist-tags - no such package available`
        );
    });

    step('publish v1.0.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v1.0.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.0.0
             npm notice filename:      demo-pkg-1.0.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toMatchShellOutput(
            'latest: 1.0.0'
        );

    });

    step('publish v1.0.1 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v1.0.1',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.0.1
             npm notice filename:      demo-pkg-1.0.1.tgz`
        );

        expect(shell.exec('npm dist-tag')).toMatchShellOutput(
            'latest: 1.0.1'
        );

    });

    step('publish v1.1.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v1.1.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.1.0
             npm notice filename:      demo-pkg-1.1.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toMatchShellOutput(
            'latest: 1.1.0'
        );

    });

    step('publish v2.0.0-rc.0 from main branch, should throw error', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v2.0.0-rc.0',
        });

        expect(shell.exec('npx volte')).toMatchShellError(
            `Error: main/master branch can only have tags in format vx.x.x`
        );

    });

    step('publish v2.0.0-rc.0 from next branch', () => {
        mockedEnv({
            BRANCH_NAME: 'next',
            TAG_NAME: 'v2.0.0-rc.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       2.0.0-rc.0
             npm notice filename:      demo-pkg-2.0.0-rc.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toMatchShellOutput(
            `
                latest: 1.1.0
                next: 2.0.0-rc.0
            `
        );

    });

});
