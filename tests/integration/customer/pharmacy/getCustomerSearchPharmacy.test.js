const { getCustomerSearchPharmacy } = require('../../../../controllers/customer/pharmacy');

let server;

describe('getCustomerSearchPharmacy', () => {
    const req = {};

    const res = {
        status: jest.fn(() => res),
        render: jest.fn()
    };

    beforeEach(() => {
        server = require('../../../../index');
    });

    afterEach(async () => {
        await server.close();
    });


    it("should render the search page", async () => {
        const expectedResult = {
            pageTitle: "Search Pharmacy",
            pharmacyInformation: [],
            hasErrors: false
        };
        getCustomerSearchPharmacy(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('customer/search_pharmacy', expectedResult);
    });

});

