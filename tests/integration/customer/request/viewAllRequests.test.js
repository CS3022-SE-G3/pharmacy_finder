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
        render:jest.fn()
    }

    it("viewAllRequests", async () => {
        const result = [{
            request_id: 60006,
            date_created: '2021-02-18'
        }];
        await viewAllRequests(req, res);
        expect(res.render).toHaveBeenCalledWith('customer/home', {
            all_requests: result,
            pageTitle: 'Requests'
        });
    });
});