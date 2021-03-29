import shell from 'shelljs';
import { log } from './logger';

/** configure shellJs to throw error on command execution failure */
shell.config.fatal = true;

export const exec = (command) => {
    log('Executing:', command);
    return shell.exec(command);
};
