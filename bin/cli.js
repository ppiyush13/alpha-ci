import { program } from 'commander';
import pkg from '../package.json';
import { run } from '../src/runner';

program
  .version(pkg.version)
  .action(() => run());

export const createCli = () => {
    program.parse(process.argv);
};
