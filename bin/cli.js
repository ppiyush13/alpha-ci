import { program } from 'commander';
import pkg from '../package.json';
import { executeAlpha } from '../src';

program
  .version(pkg.version)
  .action(() => executeAlpha());

export const createCli = () => {
    program.parse(process.argv);
};
