const c = require('config');
const {
    viewAllReportedPharmacies,
    deletePharmacy
} = require('../../../controllers/system_admin/report');
const { pool } = require('../../../database/connection');
let server;

describe('/system_admin/report test cases', () => {
    beforeEach(async () => {
        server = require('../../../index');
        await pool.query("SET autocommit = OFF;");
        await pool.query("BEGIN;");
    });

    afterEach(async () => {
        await pool.query("ROLLBACK;");
        await server.close();

    });

    const res = {
        status: jest.fn(() => res),
        render: jest.fn(),
        send: jest.fn(),
        redirect: jest.fn()
    };

    
    describe('viewAllReportedPharmacies', () => {
        let req = {};

        it("should return status code 200 and a list of reported pharmacies from the database", async () => {
            const expectedDetails = [ //TODO: too specific. generalize
                { 
                    pharmacy_id: 30009,
                    customer_id: 10004,
                    reasons: 'ssss',
                    address: '90/5B, Avissawella Rd, Nugegoda.',
                    longitude: 79.905124,
                    latitude: 6.86158,
                    email: 'info@keystonepharm.com',
                    contact_no: 112365894 
                }
            ]

            const result = await viewAllReportedPharmacies(req, res);
            await expect(res.status).toHaveBeenLastCalledWith(200);
            await expect(res.render).toHaveBeenLastCalledWith(
                'system_admin/viewpharmaciesreprted',
                {
                        title: 'welcome',
                        data:  expectedDetails,
                        "hasPharmacies": true,
                })

        });

        // it("should return status code 500 if database is not properly connected", async () => { //TODO: clarify

        // });
    });













    describe('deletePharmacy', () => {
            let req = {
                body:{
                    pharmacyID : 30009,
                    customerID : 10004
                }
            };

            it("should return status code 200 and a message that indicating deleting is success", async () => {

                const result = await deletePharmacy(req, res);
                await expect(res.status).toHaveBeenLastCalledWith(200);
                await expect(res.send).toHaveBeenLastCalledWith('Successfully deleted pharmacy account')

            });
        });






















    
});