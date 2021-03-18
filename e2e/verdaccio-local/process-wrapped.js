import { start, stop } from "./verdaccio";

process.on('message', async (message) => {

    switch(message) {
        case 'start': {
            await start(13130);
            process.send('started');
            return;
        }
        case "stop": {
            await stop();
            process.send('stopped');
            return;
        }
        default: {
            console.log('Invalid message', message);
        }
    }

});
