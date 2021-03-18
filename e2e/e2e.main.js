import shell from 'shelljs';
import { path as rootPath } from 'app-root-path';
import test, { setup, tear } from './life-cycle';
import { start, stop } from './verdaccio-local/verdaccio';

shell.config.silent = true;

setup(() => start(13130));
tear(async () => {
    await stop();
    shell.cd(rootPath);
    shell.rm('-rf', './app/demo-pkg');
});

test(step => {

    step('create demo-pkg', () => {
        shell.cp('-r', './app/test-pkg-template', './app/demo-pkg');
    });

    step('cd to demo-pkg', () => {
        shell.cd('./app/demo-pkg'); 
    });

    // step('npm login test user', () => {
    //     const user = 'volte';
    //     const pass = 'pass1234';
    //     const email = 'test@example.com';
    //     const registry = 'http://localhost:13130';
    //     const configPath = './demo-pkg/.npmrc';
    //     shell.exec(`npx npm-cli-login -u ${user} -p ${pass} -e ${email} -r ${registry} --config-path=${configPath}`);
    // });

    step('exec dist-tag, should return package not found error',  () => {
        const {stdout, stderr} = shell.exec('npm dist-tag');
        //console.log(stdout, stderr);
    });

    step('publish', () => {
        const {stdout, stderr} = shell.exec('npm publish');
        //console.log(stdout, stderr);
    });

});
