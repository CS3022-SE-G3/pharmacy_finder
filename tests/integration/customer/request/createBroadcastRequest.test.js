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
        status: jest.fn(() => res),
        render:jest.fn()
    }

    it("should redirect to the 400 error page if all pharmacies are out of range", async () => {
        req.body.drug_types = "40004";
        await createBroadcastRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('400', {
            err_data: "There are no approved pharmacies within 30km of your location that sell the medicine you require. Consider editing your location under your profile to get better search results",
            redirect_to: "/customer/request/broadcast",
            button_message: "Try Again",
            form_method: "GET"
        });
    });

    it("should redirect to the 400 error page if  no pharmacies have the necessary drugs", async () => {
        req.body.drug_types = [];
        req.body.branded_drugs = "50009";
        await createBroadcastRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('400', {
            err_data: "No pharmacies have the available drugs",
            redirect_to: "/customer/home",
            button_message: "Return to home page",
            form_method: "GET"
        });
    });

    it("should redirect to the 400 error page if a blank form is submitted", async () => {
        req.body.branded_drugs = [];
        await createBroadcastRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('400', {
        err_data: "You have not selected any drugs. Please select at least one brand/drug type",
        redirect_to: "/customer/request/broadcast",
        button_message: "Try Again",
        form_method: "GET"
        });
    });
});

describe('should redirect to customer home if request was successfully sent', () => {

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
        status: jest.fn(() => res),
        render: jest.fn(),
        redirect:jest.fn()
    }

    it("should redirect to customer home if request was successfully sent", async () => {
        await createBroadcastRequest(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.redirect).toHaveBeenCalledWith('/customer/home');
    });
});