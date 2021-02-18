const { getCustomerSearchPharmacy } = require('../../../../controllers/customer/pharmacy');

let server;

describe('getCustomerSearchPharmacy', () => {
    const req = {};

    const res = {
        render: jest.fn()
    };

    beforeEach(() => {
        server = require('../../../../index');
    });

    afterEach(async () => {
        await server.close();
    });


    it("Page rendered", async () => {
        const expectedResult = {
            pageTitle: "Search Pharmacy",
            pharmacyInformation: [],
            hasErrors: false
        };
        getCustomerSearchPharmacy(req, res);
        expect(res.render).toHaveBeenCalledWith('customer/search_pharmacy', expectedResult);
    });

});

