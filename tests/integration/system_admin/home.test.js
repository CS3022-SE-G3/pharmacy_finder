const { viewHomePage } = require('../../../controllers/system_admin/home');

let server;

describe('/system_admin/home test cases', () => {
    beforeEach(() => {
        server = require('../../../index');
    });

    afterEach(async () => {
        await server.close();

    });

    const res = {
        status: jest.fn(() => res),
        render: jest.fn(),
        send: jest.fn(),
        redirect: jest.fn()
    };

    const req = {};

    describe('viewHomePage', () => {
        it("it should return 200 and render system admin homepage", async () => {
            viewHomePage(req,res);
            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith('system_admin/home', {
                pageTitle: 'Home'
            });
        });
    });
});