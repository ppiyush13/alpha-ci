import process from 'process';
import { error } from './logger';

export const handleGlobalException = (ex) => {
    error('Global exception');
    error(ex);
    throw ex;
};

process.on('uncaughtException', handleGlobalException);
process.on('unhandledRejection', handleGlobalException);
