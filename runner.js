import tmp from 'tmp';
import shell from 'shelljs';
import exitHook from 'exit-hook';

(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve,ms));

    const tmpObj = tmp.dirSync({ prefix: 'demo-pkg', unsafeCleanup: true });
    console.log("Dir: ", tmpObj);

    exitHook(() => {
        //tmpObj.removeCallback();
        shell.cd('/');
        console.log(shell.pwd().stdout);
        shell.rm('-rf', tmpObj.name);
        console.log('exiting');
        //await delay (2 * 1000);
        console.log('exit');
    });

    //shell.cd('/');
    //console.log(shell.pwd().stdout);
    shell.cp('-r', './app/test-pkg-template/*', tmpObj.name);
    shell.cd(tmpObj.name);
    shell.exec('npm i');
    shell.cd('..');

    await delay(5 * 1000);

})();

