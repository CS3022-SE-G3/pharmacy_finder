const { reportPharmacy } = require('../../../controllers/customer/report');
const { pool } = require('../../../database/connection');
let server;

describe('customer/report test case', () => {

    const res = {
        redirect: jest.fn(),
        render: jest.fn()
        
    }
    beforeEach(async () => {
        server = require('../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
    });

    afterEach(async () => {
        await pool.query("ROLLBACK");
        await pool.end();
        await server.close();
    });

    it("should redirect to the home page once the request was sent successfully", async () => {
        const req = {
            body: {
                "pharmacy_id": "30001",
                "reasons": "Too shabby"
            },
            session: {
                user: {
                    "id": "10001"
                }
            }
        }
        await reportPharmacy(req, res);
        expect(res.redirect).toHaveBeenCalledWith('/customer/home');
    });

    it("should display the 400 error page if report was invalid ", async () => {
        const req = {
            session: {
                user: {
                    "id": "10001"
                }
            }
        }
        const expectedResult = {
            err_data: "Pharmacy report unsuccessful",
            redirect_to: "/customer/pharmacy/search",
            button_message: "Try Again",
            form_method: "GET"
        }
        await reportPharmacy(req, res);
        expect(res.render).toHaveBeenCalledWith('400', expectedResult);
    });
});