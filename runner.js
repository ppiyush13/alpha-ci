// //import mockFs from 'mock-fs';
// //import fs from 'fs';
// //import { addNpmUser } from './scripts/npm-addUser';
// //import { setupVerdaccio, teardownVerdaccio } from './scripts/verdaccio-e2e';
// //import Vinyl from 'vinyl';
// import getAuthToken from 'registry-auth-token';
// import { Volume } from 'memfs';
// import * as fs from 'fs';
// import { Union } from 'unionfs';
// import { patchRequire, patchFs } from 'fs-monkey';

// const mockVolume = volumeJson => {

//     /** create vol from given dir map */
//     const vol = Volume.fromJSON(volumeJson);
    
//     /** unify fs and mock vol */
//     const ufs = new Union();
//     ufs.use(fs).use(vol);

//     /** monkey patch node's require and fs modules */
//     patchRequire(ufs);
//     patchFs(ufs);
// };

// (async () => {

//     const authParam = {
//         username: 'volte',
//         password: 'pass1234',
//         email: 'test@example.com',
//     };

//     try {
//         //console.log(fs);
//         //console.log(getAuthToken('//localhost:13130'));
//         // mockFs({
//         //     '.npmrc': '//localhost:13130/:_authToken=54646464df4f6d==',
//         // });
//         // const content = fs.readFileSync('./.npmrc', 'utf-8');
//         // console.log('Content:', content);
        
//         // const vol = Volume.fromJSON({'.npmrc': '//localhost:13130/:_authToken=54646464df4f6d=='});
//         // ufs.use(fs).use(vol);
//         // const content = ufs.readFileSync('./.npmrc', 'utf-8');
//         //console.log('Content:', content);
//         //patchRequire(ufs);
//         //patchFs(ufs);
//         // patchRequire(vol);
//         // patchFs(vol);
//         mockVolume({
//             '.npmrc': '//localhost:13130/:_authToken=54646464df4f6d==',
//         });

//         // const port = await setupVerdaccio(13130);
//         // const { ok, token } = await addNpmUser('http://localhost:' + port, authParam);
//         // console.log(ok, token);
//         console.log(getAuthToken('//localhost:13130'));
//     }
//     catch (ex) {
//         console.log(ex);
//     }
//     finally {
//         //teardownVerdaccio();
//     }

// })();

import { addNpmUser } from './scripts/npm-addUser';
const shell = require('shelljs');

(async () => {

    const authParam = {
        username: 'volte',
        password: 'pass1234',
        email: 'test@example.com',
    };
    const { ok, token } = await addNpmUser('http://localhost:13130', authParam);
    console.log(token);

    shell.env['npm_config_registry'] = 'http://localhost:13130';
    //shell.env['npm_config_username'] = 'volte';
    process.env['npm_config__auth'] = token;
    //process.env['npm_config_//localhost:13130/:_authToken'] = token;
    shell.env['HTTP_PROXY'] = 'http://localhost:8888';

    shell.exec('npx npm publish');

})();

