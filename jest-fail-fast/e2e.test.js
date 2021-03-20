import shell from 'shelljs';
import { path as rootPath } from 'app-root-path';
import '../e2e/jest-shell';
import { start, stop } from '../e2e/verdaccio-local/fork';

jest.setTimeout(1000 * 300);

describe('testing shell output', () => {

    beforeAll(async () => {
        shell.cd(rootPath);
        await start(13130)
    });
    afterAll(async () => {
        console.log('stopping verdaccio');
        await stop();
        shell.cd(rootPath);
        shell.rm('-rf', './app/demo-pkg');
    });

    it('create demo-pkg', () => {
        console.log('create-demo-pkg');
        shell.cp('-r', './app/test-pkg-template', './app/demo-pkg');
    });

    it('cd to demo-pkg', () => {
        shell.cd('./app/demo-pkg'); 
    });

    it('npm login test user', () => {
        const user = 'volte';
        const pass = 'pass1234';
        const email = 'test@example.com';
        const registry = 'http://localhost:13130';
        const configPath = './demo-pkg/.npmrc';
        shell.exec(`npx npm-cli-login -u ${user} -p ${pass} -e ${email} -r ${registry} --config-path=${configPath}`);
    });

    it('exec dist-tag, should return package not found error',  () => {
        expect(shell.exec('npm dist-tag')).toMatchShellError(
            `npm ERR! 404 Not Found - GET http://localhost:13130/-/package/demo-pkg/dist-tags - no such package available`
        );
    });

    it('publish demo-pkg for first time', () => {
        expect(shell.exec('npm publish')).toMatchShellOutput(
            '+ demo-pkg@0.0.0'
        );
    });

});

