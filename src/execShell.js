import shell from 'shelljs';

/** configure shellJs to throw error on command execution failure */
shell.config.fatal = true;

export const exec = (command) => {
    console.log('Executing:', command);
    return shell.exec(command);
};
