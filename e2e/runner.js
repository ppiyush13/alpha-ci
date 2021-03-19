import shell from 'shelljs';
import { execSync, exec } from 'child_process';
import expect from 'expect';
import './jest-shell';
import { start, stop } from './verdaccio-local/fork';
import { path } from 'app-root-path';
import delay from 'delay';
import { promisify } from 'util';

//shell.config.verbose = true;
shell.config.silent = true;

(async () => {

    try {
        //shell.config.silent = true;
        await start();
        //shell.cp('-r', path + '/app/test-pkg-template', path + '/app/demo-pkg');
        shell.cd(path + '/app/demo-pkg');
        {
            const { stdout } = shell.exec('npx npm -v');
            console.log(stdout);
        }
        // const out = execSync('npm publish');
        // console.log(out.toString());
        const asyncExec = promisify(exec);
        const { error, stderr, stdout } = await asyncExec('npm publish');
        console.log('Error: %s\nstderr:%s\nstdout:%s', error, stderr, stdout);
        // expect(shell.exec('npm dist-tag demo-pkg')).toThrowOnShell(
        //     `npm ERR! 404 Not Found - GET http://localhost:13130/-/package/demo-pkg/dist-tags - no such package available`
        // );
        // {
        //     const { stderr, stdout } = shell.exec('npm publish');
        //     console.log(stderr); 
        // }
        // {
        //     const { stderr, stdout } = shell.exec('npm dist-tag demo-pkg');
        //     console.log(stdout);
        // }
        // {
        //     const { stderr, stdout } = shell.exec('npm publish');
        //     console.log(stderr);
        // }
        
        // await delay(10000);
    }
    catch(ex) {
        console.log(ex);
    }
    finally {
        await stop();
    }

})();

process.on('uncaughtException', () => {
    console.log('uncaughtException');
});
process.on('unhandledRejection', () => {
    console.log('unhandledRejection');
});
