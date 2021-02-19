const { viewPharmacyInfo,viewPendingPharmacies,approvePharmacy,getSearchPharmacy,postSearchPharmacy } = require('../../../controllers/system_admin/pharmacy');
const Pharmacy = require('../../../models/Pharmacy');
const { pool } = require('../../../database/connection');

let server;

describe('system_admin/pharmacy test cases', () => {
    describe('viewPharmacyInfo', () => {
        const req = {
            params: {
                "pharmacyid": "100008"
            }
        };
        const res = {
            status: jest.fn(() => res),
            render: jest.fn(),
            send: jest.fn(),
            end: jest.fn()
        };

        beforeEach(() => {
            server = require('../../../index');
        });
        afterEach(async () => {
            await server.close();
        });

        it("should return 200 and render if viewPharmacyInfo results found", async () => {
            const expectedResult = {
                pharmacyInfo: {
                    pharmacy_id: 100008,
                    name: 'Helix Pharmacy',
                    address: '433/2, Galedanda, Gonawala.',
                    email: 'info@helixpharm.com',
                    contact_no: 112911280,
                    latitude:6.965203,
                    longitude:79.931838,
                    approved_state:"Approved"
                },
                pageTitle: 'Pharmacy Info'
            };
            await viewPharmacyInfo(req, res);
            expect(res.status).toBeCalledWith(200);
            expect(res.render).toHaveBeenCalledWith("system_admin/view-pharmacy", expectedResult);
        });

        it("should return 400 if Invalid pharmacy id provided", async () => {
            req.params.pharmacyid = "1";
            await viewPharmacyInfo(req, res);
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("Invalid Account ID provided");
        });

        it("should return and render 404 if Pharmacy not found", async () => {
            req.params.pharmacyid = "999999999"; //unlikely to exist
            await viewPharmacyInfo(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.render).toHaveBeenCalledWith("404");
        });

        it("should return and render 500 if Internal server error", async () => {
            const mockError = new Error("Mock Fetch from Database Failed Error");
            const mock = jest.spyOn(Pharmacy, "getPharmacyInfo").mockImplementation(() => {return Promise.reject(mockError)});

            await viewPharmacyInfo(req,res);

            const expectedResult = {
                err_data: "Internal server error " + mockError.message
            };
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.render).toHaveBeenCalledWith("500",expectedResult);
            mock.mockRestore();
        });

    });

    describe('viewPendingPharmacies', () => {
        const req = {
        };
        const res = {
            status: jest.fn(() => res),
            render: jest.fn(),
            send: jest.fn(),
            end: jest.fn()
        };

        beforeEach(() => {
            server = require('../../../index');
        });
        afterEach(async () => {
            await server.close();
        });

        it("should return 200 and render if viewPendingPharmacies results found", async () => {
            const expectedResult = {
                pendingPharmacies: [{
                    pharmacy_id: 100003,
                    name: 'test pharmacy',
                    address: '89/1, Galle.',
                    email: 'test@gmail.com',
                    contact_no: 773640022,
                    latitude:79.123456,
                    longitude:6.123456,
                    approved_state:"Not Approved"
                },
                    {
                        pharmacy_id: 100005,
                        name: 'XYZ Pharmacy',
                        address: '258/1, Kaduruketiya Rd, Gonawala.',
                        email: 'info@xyzpharmacy.com',
                        contact_no: 773640022,
                        latitude:79.123456,
                        longitude:6.123456,
                        approved_state:"Not Approved"
                    }],
                pageTitle: 'Approval Pending Pharmacies'
            };
            await viewPendingPharmacies(req,res);
            expect(res.status).toBeCalledWith(200);
            expect(res.render).toHaveBeenCalledWith("system_admin/pending-pharmacies", expectedResult);
        });

        it("should return 200 and render if viewPendingPharmacies results is an empty array", async () => {
            const mock = jest.spyOn(Pharmacy, "getPendingPharmacies").mockImplementation(() => {return Promise.resolve([])});

            const expectedResult = {
                pendingPharmacies: [],
                pageTitle: 'Approval Pending Pharmacies'
            };
            await viewPendingPharmacies(req,res);
            expect(res.status).toBeCalledWith(200);
            expect(res.render).toHaveBeenCalledWith("system_admin/pending-pharmacies", expectedResult);
            mock.mockRestore();
        });

        it("should return and render 500 if Internal server error", async () => {
            const mockError = new Error("Mock Fetch from Database Failed Error");
            const mock = jest.spyOn(Pharmacy, "getPendingPharmacies").mockImplementation(() => {return Promise.reject(mockError)});
            await viewPendingPharmacies(req,res);

            const expectedResult = {
                err_data: "Internal server error " + mockError.message
            };
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.render).toHaveBeenCalledWith("500",expectedResult);
            mock.mockRestore();
        });

    });

    describe('approvePharmacy', () => {
        const req = {
            body: {
                "pharmacyId": ""
            }
        };
        const res = {
            status: jest.fn(() => res),
            render: jest.fn(),
            send: jest.fn(),
            end: jest.fn(),
            redirect: jest.fn()
        };

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

        it("should return 400 if Invalid pharmacy id provided", async () => {
            req.body.pharmacyId = "1";
            await approvePharmacy(req, res);
            expect(res.status).toBeCalledWith(400);
            expect(res.send).toHaveBeenCalledWith("Invalid Account ID provided");
        });

        it("should return and render 404 if Pharmacy not found", async () => {
            req.body.pharmacyId = "999999999"; //unlikely to exist
            await approvePharmacy(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.render).toHaveBeenCalledWith("404");
        });

        it("should return 409 if Pharmacy already approved", async () => {
            req.body.pharmacyId = "100008"; //unlikely to exist
            await approvePharmacy(req, res);
            expect(res.status).toHaveBeenCalledWith(409);
            expect(res.send).toHaveBeenCalledWith("Pharmacy already approved");
        });

        it("should send email, return 200 and redirect if approval successful", async () => {
            req.body.pharmacyId = "100005";
            // TODO
            await approvePharmacy(req,res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.redirect).toHaveBeenCalledWith("/system_admin/pharmacy/pending");
        });

        it("should return and render 500 if Internal server error", async () => {
            req.body.pharmacyId = "100005";
            const mockError = new Error("Mock Update Database Failed Error");
            const mock = jest.spyOn(Pharmacy, "setApprovalState").mockImplementation(() => {return Promise.reject(mockError)});
            await approvePharmacy(req,res);

            const expectedResult = {
                err_data: "Internal server error " + mockError.message
            };
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.render).toHaveBeenCalledWith("500",expectedResult);
            mock.mockRestore();
        });


    });

    describe('getSearchPharmacy',()=>{
        const req = {
        };
        const res = {
            render: jest.fn()
        };

        beforeEach(async () => {
            server = require('../../../index');
        });
        afterEach(async () => {
            await server.close();
        });

        it('should render search pharmacy page', async () => {
            const expectedResult = {
                pageTitle: "Search Pharmacy",
                pharmacyInfo: [],
                hasErrors: false
            };
            await getSearchPharmacy(req,res);
            expect(res.render).toHaveBeenCalledWith("system_admin/search-pharmacy",expectedResult);
        });
    });

    describe('postSearchPharmacy',()=>{
        const req = {
            body: {
                "pharmacyId": ""
            }
        };
        const res = {
            status: jest.fn(() => res),
            render: jest.fn()
        };

        beforeEach(async () => {
            server = require('../../../index');
        });
        afterEach(async () => {
            await server.close();
        });

        it('should return 400 and render search pharmacy page with errors if Invalid pharmacy id provided', async () => {
            req.body.pharmacyId="1";
            const expectedResult = {
                pageTitle: "Search Pharmacy",
                pharmacyInfo: [],
                hasErrors: true,
                errors: '"Pharmacy ID" must be greater than or equal to 10001'
            };
            await postSearchPharmacy(req,res);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.render).toHaveBeenCalledWith("system_admin/search-pharmacy",expectedResult);
        });
        it('should return 404 and render search pharmacy page with errors if pharmacy not found', async () => {
            req.body.pharmacyId="999999999"; //unlikely to exist
            const expectedResult = {
                pageTitle: "Search Pharmacy",
                pharmacyInfo: [],
                hasErrors: true,
                errors: "Pharmacy not registered"
            };
            await postSearchPharmacy(req,res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.render).toHaveBeenCalledWith("system_admin/search-pharmacy",expectedResult);
        });
        it('should return 200 and render search pharmacy page with result if pharmacy found', async () => {
            req.body.pharmacyId="100008";
            const expectedResult = {
                pageTitle: "Search Pharmacy",
                pharmacyInfo: [{
                    pharmacy_id: 100008,
                    name: 'Helix Pharmacy',
                    address: '433/2, Galedanda, Gonawala.',
                    email: 'info@helixpharm.com',
                    contact_no: 112911280,
                    latitude:6.965203,
                    longitude:79.931838,
                    approved_state:"Approved"
                }],
                hasErrors: false
            };
            await postSearchPharmacy(req,res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.render).toHaveBeenCalledWith("system_admin/search-pharmacy",expectedResult);
        });
        it("should return and render 500 if Internal server error", async () => {
            req.body.pharmacyId = "100008";
            const mockError = new Error("Mock Fetch from Database Failed Error");
            const mock = jest.spyOn(Pharmacy, "getPharmacyInfo").mockImplementation(() => {return Promise.reject(mockError)});
            await postSearchPharmacy(req,res);

            const expectedResult = {
                err_data: "Internal server error " + mockError.message
            };
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.render).toHaveBeenCalledWith("500",expectedResult);
            mock.mockRestore();
        });

    });

});