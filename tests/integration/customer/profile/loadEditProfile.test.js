const { loadEditProfile } = require('../../../../controllers/customer/profile');

let server;

describe('loadEditProfile', () => {
     const res = {
         render: jest.fn()
     }

     const req = {
         params: {
             customerId:10001
         }
     }
     beforeEach(() => {
         server = require('../../../../index');
     });

     afterEach(async () => {
         await server.close();

     });
    
    it("200 - Customer profile returned", async () => {
        const result = [{
            customer_id: 10001,
            full_name: 'Nimal Kalansooriya',
            nic: '951234567V',
            email: 'nimal1@gmail.com',
            address: '12/3,first lane,Borella',
            longitude: 79.878516,
            latitude: 6.913433,
            gender: 'Male',
            dob: '1995-10-08',
            contact_no: 712222222,
            password: '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO'
        }]
        await loadEditProfile(req, res);
        expect(res.render).toHaveBeenCalledWith("customer/edit_profile", {
            customerId: 10001,
            profile: result
        });
    });
    
    it("400 - Invalid customer ID in session", async () => {
        req.params.customerId = '1';
        const expectedResult = {
            err_data: "Invalid customer ID",
            redirect_to: "/customer/home",
            button_message: "Try Again",
            form_method: "GET"
        }
        await loadEditProfile(req, res);
        expect(res.render).toHaveBeenCalledWith("400", expectedResult);
    });

    it("404 - Customer ID not found", async () => {
        req.params.customerId = '10003';
        await loadEditProfile(req, res);
        expect(res.render).toHaveBeenCalledWith("404");
    });
});