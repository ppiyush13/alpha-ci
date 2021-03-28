import { setup, teardown } from 'jest-dev-server';
import getPort from 'get-port';

/** setup verdaccio */
export const setupVerdaccio = async preferredPort => {
    const allotedPort = await getPort({ port: preferredPort });
    await setup({
        command: `npm run verdaccio:e2e -- -l ${allotedPort}`,
    });

    return allotedPort;
};

/** teardown verdaccio */
export const teardownVerdaccio = () => (
    teardown()
);
