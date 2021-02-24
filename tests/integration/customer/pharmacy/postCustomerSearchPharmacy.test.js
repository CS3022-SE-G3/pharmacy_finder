const {postCustomerSearchPharmacy} = require('../../../../controllers/customer/pharmacy');

let server;

describe('postCustomerSearchPharmacy', () => {
    const req = {
        body: {
            "pharmacyName": "Helix Pharmacy"
        }
    };

    const res = {
        render: jest.fn()
    };

    beforeEach(() => {
        server = require('../../../../index');
    });

    afterEach(async () => {
        await server.close();
    });


    it("200 OK route", async () => {
        const expectedResult = {
            pageTitle: "Search Pharmacy",
            pharmacyInformation: {
                    "address": "433/2, Galedanda, Gonawala.",
                    "contact_no": 112911280,
                    "email": "info@helixpharm.com",
                    "name": "Helix Pharmacy",
                    "pharmacy_id": 30001,
                },
            hasErrors: false
        }
        await postCustomerSearchPharmacy(req, res);
        expect(res.render).toHaveBeenCalledWith("customer/view_pharmacy", expectedResult);
    });


    it("400 - Invalid pharmacy name provided", async () => {
        req.body.pharmacyName = "as";
        const expectedResult = {
            pageTitle: "Search Pharmacy",
            pharmacyInformation: [],
            hasErrors: true,
            errors: "Pharmacy not registered"
        }
        await postCustomerSearchPharmacy(req, res);
        expect(res.render).toHaveBeenCalledWith("customer/search_pharmacy", expectedResult);
    });

    it("404 - Pharmacy not found", async () => {
        req.body.pharmacyName = new Array(10).join("asd"); //autogenerates a string
        const expectedResult = {
            pageTitle: "Search Pharmacy",
            pharmacyInformation: [],
            hasErrors: true,
            errors: "Pharmacy not registered"
        }

        await postCustomerSearchPharmacy(req, res);
        expect(res.render).toHaveBeenCalledWith("customer/search_pharmacy", expectedResult);
    });

    it("500 - Internal server error", async () => {
        /**
         * @todo internal server error testing
         */
    });
});
