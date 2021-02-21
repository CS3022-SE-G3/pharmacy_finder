const { viewHome } = require('../../../controllers/pharmacy/home');

let server;

describe('pharmacyHome', () => {
    beforeEach(() => {
        server = require('../../../index');
    });

    afterEach(async () => {
        await server.close();

    });

    it("200 - Pharmacy home returned", async () => {
        const res = {
            render:jest.fn()
        }
    
        const req = {
            'session': {
                'user': {
                    'id': "100006",
                    'class': 1
                }
            }
        }

        const data = {
            requests: [
                {
                  request_id: 60019,
                  customer_name: 'Kamala Perera',
                  date_created: '2021-02-19'
                }
              ],
              responded_requests: [
                {
                  request_id: 60020,
                  customer_name: 'Kamala Perera',
                  date_created: '2021-02-19'
                }
              ],
                pharmacy_info: {
                    pharmacy_id: 100006,
                    name: 'ABC Pharmacy',
                    address: '258/1, Kaduruketiya Rd, Gonawala.',
                    longitude: 79.123456,
                    latitude: 6.123564,
                    email: 'info@abcpharmacy.com',
                    contact_no: 773640022
                }
            }

        await viewHome(req, res);
        expect(res.render).toHaveBeenCalledWith("pharmacy/dashboard", {
            data: data
        });
    });

    it("400 - Invalid access if the user is not logged in", async () => {
        const res = {
            redirect:jest.fn()
        }
    
        const req = {
            'session': {
                'user': {
                    'id': undefined,
                    'class': undefined
                }
            }
        }
        

        await viewHome(req, res);
        expect(res.redirect).toHaveBeenCalledWith("/");
    });

    it("400 - Invalid access if the user is a system admin", async () => {
        const res = {
            redirect:jest.fn()
        }
    
        const req = {
            'session': {
                'user': {
                    'class': 0
                }
            }
        }
        

        await viewHome(req, res);
        expect(res.redirect).toHaveBeenCalledWith("/system_admin/home");
    });

    it("400 - Invalid access if the user is a customer", async () => {
        const res = {
            redirect:jest.fn()
        }
    
        const req = {
            'session': {
                'user': {
                    'class': 2
                }
            }
        }
        

        await viewHome(req, res);
        expect(res.redirect).toHaveBeenCalledWith("/customer/home");
    });
});