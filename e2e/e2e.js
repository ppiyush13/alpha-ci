//import shell from 'shelljs';
//import startServer from 'verdaccio';
//const startServer = require('verdaccio');
import npmLogin from 'npm-cli-login';
import shell from 'shelljs';

{
    /** create demo-pkg */
    shell.cp('-r', 'test-pkg-template', 'demo-pkg');
}

{
    /**login and create token in .npmrc file */
    const username = 'crystal-bot';
    const password = 'pass1234';
    const email = 'test@example.com';
    const registry = 'http://localhost:13130';
    const scope = undefined;
    const quotes = false;
    const configPath = './demo-pkg/.npmrc';

    npmLogin(username, password, email, registry, scope, quotes, configPath);

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
