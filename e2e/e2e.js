//import shell from 'shelljs';
//import startServer from 'verdaccio';
//const startServer = require('verdaccio');
import npmLogin from 'npm-cli-login';
import shell from 'shelljs';
import mockedEnv from 'mocked-env';

// {
//     /** create demo-pkg */
//     shell.cp('-r', 'test-pkg-template', 'demo-pkg');
// }

{
    const user = 'volte';
    const pass = 'pass1234';
    const email = 'test@example.com';
    const registry = 'http://localhost:13130';
    const configPath = './demo-pkg/.npmrc';
    shell.exec(`npx npm-cli-login -u ${user} -p ${pass} -e ${email} -r ${registry} --config-path=${configPath}`);
}


{
    shell.cd('./demo-pkg');
    //shell.exec('npm dist-tag demo-pkg');
}

{
    mockedEnv({
        BRANCH_NAME: 'main',
        TAG_NAME: 'v1.0.0',
    });
    shell.exec('volte');
}


// const config = {
//     // auth: {
//     //     'auth-memory': {
//     //         users: {
//     //             test: {
//     //                 name: 'test',
//     //                 password: 'test',
//     //             }
//     //         }
//     //     }
//     // },
//     // store: {
//     //     memory: {
//     //         limit: 1000,
//     //     }
//     // },
//     // middlewares: {
//     //     audit: {
//     //         enabled: true,
//     //     }
//     // }
// };

// debugger

// startServer.default(config, 6000, '.', '4.11.3', 'verdaccio',
// (webServer, addrs, pkgName, pkgVersion) => {
//     console.log(addrs);
//     webServer.listen(addrs.port || addrs.path, addrs.host, () => {
//         console.log('verdaccio running');
//     });
// });

(() => {

    //shell.exec('npm run verdaccio');


})();
