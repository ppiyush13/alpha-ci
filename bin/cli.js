import program from 'commander';
import pkg from '../package.json';


export const createCli = () => {
    program.parse(process.argv);
};
