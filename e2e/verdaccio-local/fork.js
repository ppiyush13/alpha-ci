import { fork } from 'child_process';

let forkInstance;

const waitForMessage = expectedMessage => new Promise((resolve, reject) => {
    forkInstance.once('message', (receivedMessage) => {
        if(expectedMessage === expectedMessage) resolve();
        reject(`Received ${receivedMessage} as message`);
    });
});

export const start = async () => {
    forkInstance = fork(__dirname + '/process-wrapped.js', null, { silent: true });
    forkInstance.send('start');
    await waitForMessage('started');
};

export const stop = async () => {
    if(forkInstance) {
        forkInstance.send('stop');
        await waitForMessage('stopped');
        forkInstance.kill();
    }
};
