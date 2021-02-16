let server;

describe('Main suite description', () => {
    beforeEach(() => {
        server = require('../../../index');
    });

    afterEach(async () => {
        await server.close();

    });

    describe('Suite description', () => {
        it("Test description", async () => {

        });
    });
});