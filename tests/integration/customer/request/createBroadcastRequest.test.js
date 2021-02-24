const { createBroadcastRequest } = require('../../../../controllers/customer/request');
const { pool } = require('../../../../database/connection');

let server;

describe('createBroadcastRequest', () => {
    beforeEach(() => {
        server = require('../../../../index');
    });

    afterEach(async () => {
        await server.close();
    });

    const req = {
        session: {
            user: {
                id: 10002
            }
        },
        body: {
            drug_types: [],
            branded_drugs: []
        }
    }
    const res = {
        render:jest.fn()
    }

    it("Pharmacies out of range", async () => {
        req.body.drug_types = "40004";
        await createBroadcastRequest(req, res);
        expect(res.render).toHaveBeenCalledWith('400', {
            err_data: "There are no approved pharmacies within 30km of your location that sell the medicine you require. Consider editing your location under your profile to get better search results",
            redirect_to: "/customer/request/broadcast",
            button_message: "Try Again",
            form_method: "GET"
        });
    });

    it("No pharmacies have the necessary drugs", async () => {
        req.body.drug_types = [];
        req.body.branded_drugs = "50009";
        await createBroadcastRequest(req, res);
        expect(res.render).toHaveBeenCalledWith('400', {
            err_data: "No pharmacies have the available drugs",
            redirect_to: "/customer/home",
            button_message: "Return to home page",
            form_method: "GET"
        });
    });

    it("400 blank form submitted", async () => {
        req.body.branded_drugs = [];
        await createBroadcastRequest(req, res);
        expect(res.render).toHaveBeenCalledWith('400', {
        err_data: "You have not selected any drugs. Please select at least one brand/drug type",
        redirect_to: "/customer/request/broadcast",
        button_message: "Try Again",
        form_method: "GET"
        });
    });
});

describe('send customer request 200 OK', () => {

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
        session: {
            user: {
                id: 10002
            }
        },
        body: {
            drug_types: ["40001"],
            branded_drugs: ["50001", "50002"]
        }
    }
    const res = {
        render: jest.fn(),
        redirect:jest.fn()
    }

    it("sending the broadcast", async () => {
        await createBroadcastRequest(req, res);
        expect(res.redirect).toHaveBeenCalledWith('/customer/home');
    });
});