const { viewPharmacyInformation } = require('../../../controllers/customer/pharmacy');

let server;

describe('customer/pharmacy test cases', () => {
    
    describe('viewPharmacyInformation', () => {
        const req = {
            params: {
                "pharmacy_name": "Helix Pharmacy"
            }
        };

        const res = {
            render: jest.fn()
        };

        beforeEach(() => {
            server = require('../../../index');
        });

        afterEach(async () => {
            await server.close();
        });
        

        it("should display pharmacy details if pharmacy name was valid", async () => {
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
            expect(res.render).toHaveBeenCalledWith("customer/view_pharmacy", expectedResult);
        });


        it("should display the 400 error page if pharmacy name was invalid", async () => {
            req.params.pharmacy_name = "as";
            const expectedResult = {
                    err_data: "Invalid pharmacy name provided",
                    redirect_to: "/customer/pharmacy",
                    button_message: "Try Again",
                    form_method: "GET"
            }
            await viewPharmacyInformation(req, res);
            expect(res.render).toHaveBeenCalledWith("400", expectedResult);
        });

        it("should display the 404 error page if pharmacy name was not found", async () => {
            req.params.pharmacy_name = new Array(10).join("asd"); //autogenerates a string
            await viewPharmacyInformation(req, res);
            expect(res.render).toHaveBeenCalledWith("404");
        });

        it("500 - Internal server error", async () => {
            /**
             * @todo internal server error testing
             */
        });
    });

});