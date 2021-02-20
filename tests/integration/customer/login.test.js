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
    it("should redirect to customer home page if log in was successful", async () => {
        await loginCustomer(req, res);
        expect(res.redirect).toHaveBeenCalledWith('/customer/home');
    });

    it("should display the 400 error page if email was invalid", async () => {
        req.body.email = "klkml";
        await loginCustomer(req, res);
        expect(res.render).toHaveBeenCalledWith('customer/login_error', {
            err_data: "Customer Login error validation \"email\" must be a valid email"
        });
    });

     it("should display the 400 error page if email was unregistered", async () => {
         req.body.email = "klkml@gmail.com";
         await loginCustomer(req, res);
         expect(res.render).toHaveBeenCalledWith('customer/login_error', {
             err_data: "Email is not registered"
         });
     });
    
    it("should display the 400 error page if password was incorrect", async () => {
        req.body.email="s@gmail.com"
        req.body.password = "654321";
        await loginCustomer(req, res);
        expect(res.render).toHaveBeenCalledWith('customer/login_error', {
            err_data: "Invalid email or password"
        });
    });
});