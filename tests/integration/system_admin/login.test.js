
const { loginSysAdmin } = require('../../../controllers/system_admin/login');

let server;

describe('system_admin/login test cases', () => {
    beforeEach(() => {
        server = require('../../../index');
    });

    afterEach(async () => {
        await server.close();

    });

    var res = {
        status: jest.fn(() => res),
        redirect: jest.fn(),
        render: jest.fn()
    }

    var req = {
        body: {
            username: "sysad",
            password: "123456"
        },
        session: {}
    }

    it("should return should return 200 and redirect to home page if Successful customer login", async () => {
        await loginSysAdmin(req, res);
        expect(res.status).toHaveBeenLastCalledWith(200);
        expect(res.redirect).toHaveBeenLastCalledWith('/system_admin/home');
    });

    it("it should return 400 and redirect to login error page if username not registered", async () => {
        req.body.username = "klkml";
        await loginSysAdmin(req, res);
        expect(res.status).toHaveBeenLastCalledWith(400);
        expect(res.render).toHaveBeenLastCalledWith("system_admin/login_error", { "err_data": "Username is not valid" });
    });

    it("it should return 400 and render login error page if Password incorrect", async () => {
        req.body.username = "sysad"
        req.body.password = "false";
        await loginSysAdmin(req, res);
        expect(res.status).toHaveBeenLastCalledWith(400);
        expect(res.render).toHaveBeenLastCalledWith("system_admin/login_error", { "err_data": "Invalid username or password" });
    });

    it("should return should return 400 and redirect to login error page if username or password is null", async () => {
        var falsyValueSets = [
            {
                username: "sysad",
                password: null
            },
            {
                username: null,
                password: "123456"
            }

        ]
        falsyValueSets.forEach(await checkSet);

        async function checkSet(item, index, arr) {
            req.body=item;
            await loginSysAdmin(req, res);
            expect(res.status).toHaveBeenLastCalledWith(400);
        }
    });
});