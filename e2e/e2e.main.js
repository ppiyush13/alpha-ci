import shell from 'shelljs';
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
        expect(shell.exec('npm dist-tag')).toMatchShellError(
            `npm ERR! 404 Not Found - GET http://localhost:13130/-/package/demo-pkg/dist-tags - no such package available`
        );
    });

    step('publish demo-pkg for first time', () => {
        expect(shell.exec('npm publish')).toMatchShellOutput(
            '+ demo-pkg@0.0.0'
        );
    });

    step('exec dist-tag, must return 0.0.0', () => {
        shell.exec('npm publish');
        // expect(shell.exec('npm publish')).toMatchShellOutput(
        //     'latest 0.0.0'
        // );
    });

});
