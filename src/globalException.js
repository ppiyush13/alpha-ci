import { error } from './logger';

export const handleGlobalException = (ex) => {
    error('Global exception');
    error(ex);
    process.exit(1);
};

process.on('uncaughtException', handleGlobalException);
process.on('unhandledRejection', handleGlobalException);
