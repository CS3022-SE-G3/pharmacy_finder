const { editProfileInformation } = require('../../../../controllers/customer/profile');
const { pool } = require('../../../../database/connection');

let server;

describe('editProfileInformation', () => {
    beforeEach(() => {
        server = require('../../../../index');
    });

    afterEach(async () => {
        await server.close();
    });

    const res = {
        render: jest.fn()
    }

    const req = {
        'body': {
            full_name: 'Nimal Kalansooriya',
            nic: '951234567V',
            email: 'nimal1@gmail.com',
            address: '12/3,first lane,Borella',
            longitude: 79.878516,
            latitude: 6.913433,
            gender: 'Male',
            dob: '1995-10-08',
            contact_no: 712222222,
        }
    }
    it("400 - Invalid customer ID in session", async () => {
        req.body.email = "123123";
        const expectedResult = {
            err_data: "\"email\" must be a valid email",
            redirect_to: "/customer/home",
            button_message: "Try Again",
            form_method: "GET"
        }
        await editProfileInformation(req, res);
        expect(res.render).toHaveBeenCalledWith("400", expectedResult);
    });
});

describe('Actual Profile Editing', () => {

    const res = {
        render: jest.fn(),
        redirect: jest.fn()
    }
    const req = {
        "session": {
            "user": {}
        },
        'body': {
            "customer_id": '10001',
            'full_name': 'Nimal Kalansooriya',
            'nic': '951234567V',
            'email': 'nimal12345@gmail.com',
            'address': '12/3,first lane,Borella',
            'longitude': 79.878516,
            'latitude': 6.913433,
            'gender': 'Male',
            'dob': '1995-10-08',
            'contact_no': 712222222,
        }
    }

    beforeEach(async () => {
        server = require('../../../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
    });

    afterEach(async () => {
        await pool.query("ROLLBACK");
        await pool.end();
        await server.close();
    });

    it("200 Customer profile information edited", async () => {
        await editProfileInformation(req, res);
        expect(res.redirect).toHaveBeenCalledWith('/customer/profile/view');
    });
});