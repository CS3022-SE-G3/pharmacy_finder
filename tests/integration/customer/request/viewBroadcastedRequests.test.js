const { viewBroadcastedRequests } = require('../../../../controllers/customer/request');
let server;

describe('customer/request test cases', () => {
    beforeEach(() => {
        server = require('../../../../index');
    });

    afterEach(async () => {
        await server.close();
    });
    const req = {
        params: {
            requestId: 60004
        }
    }
    const res = {
        status: jest.fn(() => res),
        render:jest.fn()
    }

    it("should display all the pharmacies that replied to that request", async () => {
        req.params.requestId = 60004;
        await viewBroadcastedRequests(req, res);
        expect(res.status).toHaveBeenCalledWith(200);

        expect(res.render).toHaveBeenCalledWith('customer/view_requests', {
            drug_types: [{
                drug_type_id: 40002,
                drug_type_name: 'Amlodipine 10mg'
            }],
            branded_drugs: [
                 {
                    "brand_name": "Amlogard 10",
                    "branded_drug_id": 50005,
                    "drug_type_name": "Amlodipine 10mg",
                    "manufacturer": "Pfizer",
                },
                
            ],
            hasPharmacies: true,
            pharmacies: [
                {
                    pharmacy_id: 30001,
                    name: 'Helix Pharmacy',
                    address: '433/2, Galedanda, Gonawala.'
                }
            ],
            pageTitle: 'Request Details'
        });
    });

    it("should indicate that there are no pharmacies that replied to a specific request", async () => {
        req.params.requestId = 60003;
        await viewBroadcastedRequests(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('customer/view_requests', {
            drug_types: [
                {
                    drug_type_id: 40002,
                    drug_type_name: 'Amlodipine 10mg'
                }
            ],
            branded_drugs: [],
            hasPharmacies: false,
            pageTitle: 'Request Details'
        });
    });

    it("should redirect to the 400 error page if the request ID is invalid", async () => {
        req.params.requestId = 1;
        await viewBroadcastedRequests(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.render).toHaveBeenCalledWith('400', {
            err_data: "Invalid Request",
            redirect_to: "/customer/home",
            button_message: "Return to home page",
            form_method: "GET"
        });
    });
});