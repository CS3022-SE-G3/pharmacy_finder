const { viewAllRequests } = require('../../../../controllers/customer/request');

let server;

describe('customer/request', () => {
    beforeEach(() => {
        server = require('../../../../index');
    });

    afterEach(async () => {
        await server.close();

    });

    const req = {
        session: {
            user: {
                id:10001
            }
        }
    }
    const res = {
        status: jest.fn(() => res),
        render:jest.fn()
    }

    it("should display all the customer requests on the home page", async () => {
        const result = [{
            request_id: 60006,
            date_created: '2021-02-18'
        }];
        await viewAllRequests(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('customer/home', {
            all_requests: result,
            pageTitle: 'Requests'
        });
    });
});