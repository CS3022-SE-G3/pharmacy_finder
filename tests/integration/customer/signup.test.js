const { signupCustomer } = require('../../../controllers/customer/signup');
const { pool } = require('../../../database/connection');

let server;

describe('customer/signup test cases', () => {
    
    describe('signupCustomer', () => {
        beforeEach(async () => {
            server = require('../../../index');
        });

        afterEach(async () => {
            await server.close();
        });

        const req = {
            body: {
                "full_name": "Nalin Siriwardhana",
                "nic": "883678783V",
                "email": "nalin285@gmail.com",
                "address": "12/7,first lane,Rajagiriya",
                "latitude": "6.908951",
                "longitude": "79.892441",
                "gender": "MALE",
                "dob": "1988-04-18",
                "contact_no": "0775555555",
                "password": "123456",
                "confirm_password": "123456"
            }
        }
        const res = {
            status: jest.fn(() => res),
            render: jest.fn()
        }
        
        it("should display the 400 error page if sign up information was invalid", async () => {
            req.body.confirm_password = "654321";

            const expectedResult = {
                    error_msg: "\"confirm_password\" must be [ref:password]",
                    post_body: req.body
            }
            await signupCustomer(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.render).toHaveBeenCalledWith('customer/signup_error', expectedResult);

        });

        it("should display the 400 error page if email was already registered", async () => {
            req.body.email = "nimal1@gmail.com";
            req.body.confirm_password = "123456";

            const expectedResult = {
                error_msg: "This email address has already been registered",
                post_body: req.body
            }
            await signupCustomer(req, res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.render).toHaveBeenCalledWith('customer/signup_error', expectedResult);

        });
    });

    describe('signupCustomer', () => {
        const req = {
            body: {
                "full_name": "Nalin Siriwardhana",
                "nic": "883678783V",
                "email": "nalin285@gmail.com",
                "address": "12/7,first lane,Rajagiriya",
                "latitude": "6.908951",
                "longitude": "79.892441",
                "gender": "MALE",
                "dob": "1988-04-18",
                "contact_no": "0775555555",
                "password": "123456",
                "confirm_password": "123456"
            }
        }
        const res = {
            status: jest.fn(() => res),
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

        it("should successfully register the customer and redirect to home page if sign up was successful ", async () => {
            await signupCustomer(req, res);
            expect(res.status).toHaveBeenCalledWith(200);

            expect(res.redirect).toHaveBeenCalledWith('/customer/login');
        });
    });
});