const { loginCustomer } = require('../../../controllers/customer/login');

let server;

describe('customer/login test cases', () => {
    beforeEach(() => {
        server = require('../../../index');
    });

    afterEach(async () => {
        await server.close();

    });

    var res = {
        render: jest.fn(),
        redirect:jest.fn()
    }

    var req = {
        body: {
            "email": "s@gmail.com",
            "password":"123456"
        },
        session: {}
    }
    it("200 Successful customer login", async () => {
        await loginCustomer(req, res);
        expect(res.redirect).toHaveBeenCalledWith('/customer/home');
    });

    it("400 Invalid customer login", async () => {
        req.body.email = "klkml";
        await loginCustomer(req, res);
        expect(res.render).toHaveBeenCalledWith('customer/login_error', {
            err_data: "Customer Login error validation \"email\" must be a valid email"
        });
    });

     it("400 Email not registered", async () => {
         req.body.email = "klkml@gmail.com";
         await loginCustomer(req, res);
         expect(res.render).toHaveBeenCalledWith('customer/login_error', {
             err_data: "Email is not registered"
         });
     });
    
    it("400 Password incorrect", async () => {
        req.body.email="s@gmail.com"
        req.body.password = "654321";
        await loginCustomer(req, res);
        expect(res.render).toHaveBeenCalledWith('customer/login_error', {
            err_data: "Invalid email or password"
        });
    });
});