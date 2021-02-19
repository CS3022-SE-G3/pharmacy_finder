const { loginPharmacy } = require('../../../controllers/pharmacy/login');

let server;

describe('pharmacy/login test cases', () => {
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
            "email": "info@abcpharmacy.com",
            "password":"123456"
        },
        session: {}
    }

    it("200 Successful pharmacy login", async () => {
        await loginPharmacy(req, res);
        expect(res.redirect).toHaveBeenCalledWith('/pharmacy/home');
    });

    it("400 Invalid pharmacy login", async () => {
        req.body.email = "a";
        await loginPharmacy(req, res);
        expect(res.render).toHaveBeenCalledWith('pharmacy/login_error', {
            err_data: "Pharmacy Login error validation \"email\" must be a valid email"
        });
    });

    it("400 Pharmacy not approved yet", async () => {
        req.body.email = "info@xyzpharmacy.com";
        await loginPharmacy(req, res);
        expect(res.render).toHaveBeenCalledWith('pharmacy/login_error', {
            err_data: "Your pharmacy have not been approved"
        });
    });

    it("400 Email not registered", async () => {
         req.body.email = "a@gmail.com";
         await loginPharmacy(req, res);
         expect(res.render).toHaveBeenCalledWith('pharmacy/login_error', {
             err_data: "Email is not registered"
         });
     });
    
    it("400 Password incorrect", async () => {
        req.body.email="info@abcpharmacy.com"
        req.body.password = "a";
        await loginPharmacy(req, res);
        expect(res.render).toHaveBeenCalledWith('pharmacy/login_error', {
            err_data: "Invalid email or password"
        });
    });

});