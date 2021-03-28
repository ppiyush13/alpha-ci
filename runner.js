
import getAuthToken from 'registry-auth-token';
import shell from 'shelljs';
import { getTestUserAuthToken } from './scripts/verdaccio-user-token';

shell.config.verbose = true;

process.env['npm_config__auth'] = getTestUserAuthToken();
//getAuthToken();

shell.exec('npm config ls ');