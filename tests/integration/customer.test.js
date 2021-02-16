let server;

describe('Customer model', () => {
    beforeEach(() => {
        server = require('../../index');
    });

    afterEach(async () => {
        await server.close();
    });

    describe('Suite description', () => {
        it("Test description", async () => {

        });
    });
});