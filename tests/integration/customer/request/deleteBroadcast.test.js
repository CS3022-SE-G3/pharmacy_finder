const { deleteBroadcast } = require('../../../../controllers/customer/request');
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

    const req = {
        body: {
            requestID: "60002"
        }
    }

    const res = {
        redirect:jest.fn()
    }

    it("deleting broadcasts", async () => {
        await deleteBroadcast(req, res);
        expect(res.redirect).toHaveBeenCalledWith('/customer/home');
    });
});