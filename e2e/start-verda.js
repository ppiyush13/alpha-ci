import startServer from 'verdaccio';
import enableDestroy from 'server-destroy';
import { version , name } from 'verdaccio/package.json';

const config = {
    "auth": {
        "auth-memory": {
            "users": {
                "volte": {
                    "name": "volte",
                    "password": "pass1234"
                }
            }
        }
    },
    "uplinks": {
        "npmjs": {
            "url": "https://registry.npmjs.org/"
        }
    },
    "store": {
        "memory": {
            "limit": 1000
        }
    },
    "packages": {
        "**": {
            "access": "$anonymous",
            "publish": "$anonymous",
            "unpublish": "$anonymous"
        }
    }
};

const verdaccioStart = (config, port) => new Promise((resolve) => {
    startServer(config, port, undefined, version, name, (...args) => resolve(args));
});

const webServerListen = (webServer, port, host ) => new Promise((resolve, reject) => {
    webServer.listen(port, host, () => {
        resolve();
    });
});

const webServerInstance = {
    current: undefined,
};

export const start = async (port) => {

    /** try to start web server */
    console.log('trying to start');
    const [webServer, address, pkgName, pkgVersion] =  await verdaccioStart(config, port);

    /** register destroy middleware */
    enableDestroy(webServer);

    /** start web server */
    webServerListen(webServer, address.port || address.path, address.host);
    
    /** persists web server instance in global variable  */
    webServerInstance.current = webServer;
    
    /** log */
    console.log('Verdaccio started running, host: %s://%s:%s - %s/%s', 
        address.proto, address.host, address.port, pkgName, pkgVersion);
};

export const stop = () => {
    if(webServerInstance.current){
        console.log('Verdaccio attempting to stop');
        webServerInstance.current.destroy();
    }
    else {
        /** throw error ? */
    }
};
