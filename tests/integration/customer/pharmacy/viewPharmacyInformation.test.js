const { viewPharmacyInformation } = require('../../../../controllers/customer/pharmacy');
let server;

describe('viewPharmacyInformation', () => {
    const req = {
        params: {
            "pharmacy_name": "Helix Pharmacy"
        }
    };

    const res = {
        status: jest.fn(() => res),
        render: jest.fn()
    };

    beforeEach(() => {
        server = require('../../../../index');
    });

    afterEach( () => {
        server.close();
    });

    it("should display the pharmacy information if the view request was successful", async () => {
        const expectedResult = {
            pharmacyInformation: {
                pharmacy_id: 30001,
                name: 'Helix Pharmacy',
                address: '433/2, Galedanda, Gonawala.',
                email: 'info@helixpharm.com',
                contact_no: 112911280
            },
            pageTitle: 'Pharmacy Information'
        }
        await viewPharmacyInformation(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith("customer/view_pharmacy", expectedResult);
    });


    it("should display 400 error page if the pharmacy name is invalid", async () => {
        req.params.pharmacy_name = "as";
        const expectedResult = {
            err_data: "Invalid pharmacy name provided",
            redirect_to: "/customer/pharmacy",
            button_message: "Try Again",
            form_method: "GET"
        }
        await viewPharmacyInformation(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith("400", expectedResult);
    });

    it("should display 404 error page if the pharmacy is not found", async () => {
        req.params.pharmacy_name = new Array(10).join("asd"); //autogenerates a string
        await viewPharmacyInformation(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.render).toHaveBeenCalledWith("404");
    });

    it("500 - Internal server error", async () => {
        /**
         * @todo internal server error testing
         */
    });
});