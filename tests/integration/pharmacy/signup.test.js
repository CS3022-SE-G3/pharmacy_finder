const { signupPharmacy } = require('../../../controllers/pharmacy/signup');
const { pool } = require('../../../database/connection');

let server;

describe('pharmacy/signup test cases', () => {
    let req = {
        body: {
            "name": "Pharmacy 01",
            "address": "100/1, A Road, ABC.",
            "longitude": "80",
            "latitude": "6",
            "email": "info@defpharmacy.com",
            "contact_no": "1234567890",
            "password": "123456",
            "confirm_password": "123456"
        }
    }
    
    describe('signupPharmacy', () => {
        beforeEach(async () => {
            server = require('../../../index');
        });

        afterEach(async () => {
            await server.close();
        });

        const res = {
            render: jest.fn()
        }
        
        it("400 Invalid sign up information", async () => {
            req.body.confirm_password = "654321";

            const expectedResult = {
                    error_msg: "\"confirm_password\" must be [ref:password]",
                    post_body: req.body
            }
            await signupPharmacy(req, res);
            expect(res.render).toHaveBeenCalledWith('pharmacy/signup_error', expectedResult);

        });

        it("400 Email already registered", async () => {
            req.body.email = "info@abcpharmacy.com";
            req.body.confirm_password = "123456";

            const expectedResult = {
                error_msg: "This email has already been registered",
                post_body: req.body
            }
            await signupPharmacy(req, res);
            expect(res.render).toHaveBeenCalledWith('pharmacy/signup_error', expectedResult);

        });

        it("400 Minimmum password length should be 5", async () => {
            req.body.password = "1234";
            req.body.confirm_password = "1234";

            const expectedResult = {
                error_msg: "\"password\" length must be at least 5 characters long",
                post_body: req.body
            }
            await signupPharmacy(req, res);
            expect(res.render).toHaveBeenCalledWith('pharmacy/signup_error', expectedResult);

        });
    });

    describe('signupPharmacy', () => {
        const res = {
            redirect: jest.fn()
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

        it("200 Pharmacy sign up", async () => {
            req.body.email = "info@defpharmacy.com";
            req.body.password = "123456";
            req.body.confirm_password = "123456";
            await signupPharmacy(req, res);
            expect(res.redirect).toHaveBeenCalledWith('/pharmacy/login');
        });
    });
});

