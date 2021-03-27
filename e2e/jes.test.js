import shell from 'shelljs';
import mockedEnv from 'mocked-env';
import { path as rootPath } from 'app-root-path';
import './jest-matchers/match-shell';
import { setup as setupDevServer, teardown as teardownDevServer } from 'jest-dev-server';

jest.setTimeout(300 * 1000);

describe('Testing Alpha', () => {

    shell.config.silent = true;

    beforeAll(async () => {
        await setupDevServer({
            command: 'npm run server',
        });
        //await start();
        console.log('beforeAll - completed');
    });

    afterAll(async () => {
        //await stop();
        await teardownDevServer();
        shell.cd(rootPath);
        shell.rm('-rf', './app/demo-pkg');
    });

    it('cd to rootDir', () => {
        shell.cd(rootPath);
    });

    // it('publish volte', () => {
    //     expect(shell.exec('npm publish --registry http://localhost:13130/')).toMatchShellOutput(
    //         `npm notice === Tarball Details ===
    //          npm notice name: volte`
    //     );
    // });

    it('remove demo-pkg, if exits already', () => {
        shell.rm('-rf', './app/demo-pkg');
    });

    it('create demo-pkg', () => {
        shell.cp('-r', './app/test-pkg-template', './app/demo-pkg');
    });

    it('cd to demo-pkg', () => {
        shell.cd('./app/demo-pkg'); 
    });
    
    it('link volte into demo-pkg', () => {
        shell.ln('-s', '../../..', 'node_modules/volte');
    });

    it('npm login test user', () => {
        const user = 'volte';
        const pass = 'pass1234';
        const email = 'test@example.com';
        const registry = 'http://localhost:13130';
        const configPath = '.npmrc';
        expect(shell.exec(`npx npm-cli-login -u ${user} -p ${pass} -e ${email} -r ${registry} --config-path ${configPath}`)).toMatchShellOutput(
            `http 201 http://localhost:13130/-/user/org.couchdb.user:volte`,
        );
    });

    it('exec dist-tag, should return package not found error',  () => {
        expect(shell.exec('npm dist-tag demo-pkg')).toMatchShellError(
            `npm ERR! 404 Not Found - GET http://localhost:13130/-/package/demo-pkg/dist-tags - no such package available`
        );
    });

    it('publish v1.0.0 from next branch, should throw error', () => {
        mockedEnv({
            BRANCH_NAME: 'next',
            TAG_NAME: 'v1.0.0-rc.0',
        });

        expect(shell.exec('npx volte')).toMatchShellError(
            `First release must be published from main/master branch, but found branch next`
        );
    });

    it('publish v1.0.0 from v1 branch, should throw error', () => {
        mockedEnv({
            BRANCH_NAME: 'v1',
            TAG_NAME: 'v1.0.0',
        });

        expect(shell.exec('npx volte')).toMatchShellError(
            `First release must be published from main/master branch, but found legacy branch v1`
        );
    });

    it('publish v1.0.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v1.0.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.0.0
             npm notice filename:      demo-pkg-1.0.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest: 1.0.0
                next: 1.0.0
            `
        );
    });

    it('publish v1.0.1 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v1.0.1',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.0.1
             npm notice filename:      demo-pkg-1.0.1.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest: 1.0.1
                next: 1.0.1
            `
        );

    });

    it('publish v1.1.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v1.1.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.1.0
             npm notice filename:      demo-pkg-1.1.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest: 1.1.0
                next: 1.1.0
            `
        );

    });

    it('publish v2.0.0-rc.0 from main branch, should throw error', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v2.0.0-rc.0',
        });

        expect(shell.exec('npx volte')).toMatchShellError(
            `main/master branch can only have tags in format vx.x.x but found tag v2.0.0-rc.0`
        );

    });

    it('publish v2.0.0-rc.0 from next branch', () => {
        mockedEnv({
            BRANCH_NAME: 'next',
            TAG_NAME: 'v2.0.0-rc.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       2.0.0-rc.0
             npm notice filename:      demo-pkg-2.0.0-rc.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest: 1.1.0
                next: 2.0.0-rc.0
            `
        );
    });

    it('publish v1.2.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v1.2.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.2.0
             npm notice filename:      demo-pkg-1.2.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest: 1.2.0
                next: 2.0.0-rc.0
            `
        );
    });

    it('publish v1.1.5 from main branch, should throw error', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v1.1.5',
        });

        expect(shell.exec('npx volte')).toMatchShellError(
            `main/master branch tag v1.1.5 should be greater than published package latest version 1.2.0`
        );

    });

    it('publish v2.0.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v2.0.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       2.0.0
             npm notice filename:      demo-pkg-2.0.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.2.0
                latest: 2.0.0
                next: 2.0.0
            `
        );
    });

    it('publish v2.0.1 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v2.0.1',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       2.0.1
             npm notice filename:      demo-pkg-2.0.1.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.2.0
                latest: 2.0.1
                next: 2.0.1
            `
        );
    });

    it('publish v1.3.0 from v1 branch', () => {
        mockedEnv({
            BRANCH_NAME: 'v1',
            TAG_NAME: 'v1.3.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.3.0
             npm notice filename:      demo-pkg-1.3.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.3.0
                latest: 2.0.1
                next: 2.0.1
            `
        );
    });

    it('publish v2.1.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v2.1.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       2.1.0
             npm notice filename:      demo-pkg-2.1.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.3.0
                latest: 2.1.0
                next: 2.1.0
            `
        );
    });

    it('publish v2.2.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v2.2.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       2.2.0
             npm notice filename:      demo-pkg-2.2.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.3.0
                latest: 2.2.0
                next: 2.2.0
            `
        );
    });

    it('publish v3.0.0 from v3 branch, should throw error', () => {
        mockedEnv({
            BRANCH_NAME: 'v3',
            TAG_NAME: 'v3.3.0',
        });

        expect(shell.exec('npx volte')).toMatchShellError(
            `Legacy branch tag v3.3.0 should be lesser than published latest package version 2.2.0`,
        );
    });

    it('publish v3.0.0 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v3.0.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       3.0.0
             npm notice filename:      demo-pkg-3.0.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.3.0
                latest-2: 2.2.0
                latest: 3.0.0
                next: 3.0.0
            `
        );
    });

    it('publish v2.3.0 from v2 branch', () => {
        mockedEnv({
            BRANCH_NAME: 'v2',
            TAG_NAME: 'v2.3.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       2.3.0
             npm notice filename:      demo-pkg-2.3.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.3.0
                latest-2: 2.3.0
                latest: 3.0.0
                next: 3.0.0
            `
        );
    });

    it('publish v1.4.0 from v1 branch', async () => {
        mockedEnv({
            BRANCH_NAME: 'v1',
            TAG_NAME: 'v1.4.0',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       1.4.0
             npm notice filename:      demo-pkg-1.4.0.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.4.0
                latest-2: 2.3.0
                latest: 3.0.0
                next: 3.0.0
            `
        );
    });

    it('publish v3.0.1 from main branch', () => {
        mockedEnv({
            BRANCH_NAME: 'main',
            TAG_NAME: 'v3.0.1',
        });

        expect(shell.exec('npx volte')).toMatchShellOutput(
            `npm notice name:          demo-pkg
             npm notice version:       3.0.1
             npm notice filename:      demo-pkg-3.0.1.tgz`
        );

        expect(shell.exec('npm dist-tag')).toEqualShellOutput(
            `
                latest-1: 1.4.0
                latest-2: 2.3.0
                latest: 3.0.1
                next: 3.0.1
            `
        );
    });

    it('publish v3.0.2-rc.4 from next branch, should throw error', () => {
        mockedEnv({
            BRANCH_NAME: 'next',
            TAG_NAME: 'v3.0.2-rc.4',
        });

        expect(shell.exec('npx volte')).toMatchShellError(
            `For next branch, major version after latest release 3.0.1 should be incremented by 1, but found v3.0.2-rc.4`,
        );
    });

});
