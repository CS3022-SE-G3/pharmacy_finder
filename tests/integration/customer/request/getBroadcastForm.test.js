const { getBroadcastForm } = require('../../../../controllers/customer/request');
const { pool } = require('../../../../database/connection');

let server;

describe('customer/request test case', () => {

    beforeEach(async () => {
        server = require('../../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
    });

    afterEach(async () => {
        await pool.query("ROLLBACK");
        await pool.end();
        await server.close();
    });

    const req = {}

    const res = {
        status: jest.fn(() => res),
        render:jest.fn()
    }

    it("getting broadcast form", async () => {
        await getBroadcastForm(req, res);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.render).toHaveBeenCalled();
    });
});