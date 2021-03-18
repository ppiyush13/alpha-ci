import shell from 'shelljs';
import mockedEnv from 'mocked-env';
import { start, stop } from './verdaccio';

/** configure shellJs to throw error on command execution failure */
shell.config.fatal = true;

// describe('e2e test volte', () => {

//     beforeAll(() => start());
//     afterAll(() => stop());

//     it('must follow steps', () => {

//     });

// });

// {
//     /** create demo-pkg */
//     shell.cp('-r', 'test-pkg-template', 'demo-pkg');
// }

{
    //await start();
}

// {
//     const user = 'volte';
//     const pass = 'pass1234';
//     const email = 'test@example.com';
//     const registry = 'http://localhost:13130';
//     const configPath = './demo-pkg/.npmrc';
//     shell.exec(`npx npm-cli-login -u ${user} -p ${pass} -e ${email} -r ${registry} --config-path=${configPath}`);
// }

{
    shell.cd('./demo-pkg');
    //shell.exec('npm dist-tag demo-pkg');// this must fail
}

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v1.0.0',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v1.0.1',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v1.1.0',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'next',
//         TAG_NAME: 'v2.0.0-rc.0',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'next',
//         TAG_NAME: 'v2.0.0-rc.1',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v1.2.0',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'next',
//         TAG_NAME: 'v2.0.0-rc.2',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v2.0.0',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
//     // TODO: add assertion that version 1.2.0 is set to dist-tag latest-1  
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v2.0.1',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'v1',
//         TAG_NAME: 'v1.3.0',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'v3',
//         TAG_NAME: 'v3.3.0',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
//     // TODO: this must fail
// }


// {
//     mockedEnv({
//         BRANCH_NAME: 'next',
//         TAG_NAME: 'v3.0.0-rc.0',
//     });
//     shell.exec('volte');
// }

// {
//     shell.exec('npm dist-tag demo-pkg');
// }


// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v2.0.2',
//     });
//     shell.exec('volte');
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v3.0.0',
//     });
//     shell.exec('volte');
//     shell.exec('npm dist-tag demo-pkg');
//     // TODO assert that latest-2 dist-tag is also create
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'v2',
//         TAG_NAME: 'v2.1.0',
//     });
//     shell.exec('volte');
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'v1',
//         TAG_NAME: 'v1.3.1',
//     });
//     shell.exec('volte');
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v3.0.1',
//     });
//     shell.exec('volte');
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'next',
//         TAG_NAME: 'v3.0.2-rc.4',
//     });
//     shell.exec('volte');
//     shell.exec('npm dist-tag demo-pkg');
//     // TODO this should not allow to publish same major version from next branch
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'main',
//         TAG_NAME: 'v3.1.0',
//     });
//     shell.exec('volte');
//     shell.exec('npm dist-tag demo-pkg');
// }

// {
//     mockedEnv({
//         BRANCH_NAME: 'v3',
//         TAG_NAME: 'v3.0.3',
//     });
//     shell.exec('volte');
//     shell.exec('npm dist-tag demo-pkg');
//     // TODO this must fail
// }

// {
//     const out = shell.exec('npm dist-tag demo-pkg');
//     console.log(out);
// }
