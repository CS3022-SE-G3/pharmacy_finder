const c = require('config');
const {
    viewCustomerInformation,renderForm
} = require('../../../controllers/system_admin/customer');
const { pool } = require('../../../database/connection');
let server;

describe('/system_admin/drug_type test cases', () => {
    beforeEach(async () => {
        server = require('../../../index');
        await pool.query("SET autocommit = OFF;");
        await pool.query("BEGIN;");
    });

    afterEach(async () => {
        await pool.query("ROLLBACK;");
        //await pool.end();
        await server.close();

    });

    const res = {
        status: jest.fn(() => res),
        render: jest.fn(),
        send: jest.fn(),
        redirect: jest.fn(),
        json: jest.fn()
    };

    describe('viewCustomerInformation', () => {
        let req = {
            params:{
                accountId : 10004
            }
        };

        it("should return status code 400 and a error of Invalid Account Information Provided", async () => {
            const expectedDetails = [ //TODO: too specific. generalize
                {
                    err_data: "Invalid Account Information Provided",
                    redirect_to: "/system_admin/home",
                    button_message: "Try Again",
                    form_method: "GET"
                }
            ]
            let req = {
            params:{
                accountId : '' // Fault
            }
        };

            const result = await viewCustomerInformation(req, res);
            await expect(res.status).toHaveBeenLastCalledWith(400);
            await expect(res.render).toHaveBeenLastCalledWith('400',expectedDetails[0])

        });

        it("should return status code 400 and a error of Account ID was not found.", async () => {
            const expectedDetails = [ //TODO: too specific. generalize
                {
                    err_data: "Account ID was not found.",
                    redirect_to: "/system_admin/search",
                    button_message: "Try Again",
                    form_method: "GET"
                }
            ]
            let req = {
            params:{
                accountId : 99999 // Fault
            }
        };

            const result = await viewCustomerInformation(req, res);
            await expect(res.status).toHaveBeenLastCalledWith(400);
            await expect(res.render).toHaveBeenLastCalledWith('400',expectedDetails[0])

        });

        describe('renderForm', () => {
        let req = {};

        it("should return status code 'system_admin/viewCustomer',{title: 'View | customer'}", async () => {
            
            const result = await renderForm(req, res);
            await expect(res.render).toHaveBeenLastCalledWith('system_admin/viewCustomer',{title: 'View | customer'})

        });

    });

        it("should return status code 200 and a list of drug types from the database", async () => {
            const expectedDetails = [ //TODO: too specific. generalize
                { 
                    full_name: 'Nalin Siriwardhana',
                    nic: '883678783V',
                    email: 'nalin@gmail.com',
                    address: '12/7,first lane,Rajagiriya',
                    gender: 'Male',
                    dob: '1988-04-18',
                    contact_no: 775555555
                }
            ]
            const result = await viewCustomerInformation(req, res);
            await expect(res.status).toHaveBeenLastCalledWith(200);
            await expect(res.json).toHaveBeenLastCalledWith(expectedDetails[0])

        });

        
    });
    

    
});