
export const handleGlobalException = ex => {
    console.error('Global exception');
    console.error(ex);
    process.exit(1);
};

process.on('uncaughtException', handleGlobalException);
process.on('unhandledRejection', handleGlobalException);
