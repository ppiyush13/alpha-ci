import test, { setup, tear } from './life-cycle';
import { start, stop } from './verdaccio';

//setup(() => start(13130));
//tear(() => console.log('After All'));

const sleep = sec => new Promise(resolve => setTimeout(resolve, 1000));

test(step => {

    step('cd to demo-pkg', () => {
        return sleep(2);
    });

    step('exec dist-tag, should return package not found error', () => {
        //return sleep(2);
        throw new Error('Some Error');
    });

    step('publish', () => {
        return sleep(2);
    });

});
