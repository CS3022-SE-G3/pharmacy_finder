const Customer = require('../../models/Customer');
const { pool } = require('../../database/connection');

let server;

describe('Customer model', () => {
    beforeEach(async () => {
        server = require('../../index');
        await pool.query("SET autocommit = OFF");
        await pool.query("BEGIN");
        
    });

    afterEach(async () => {
        await pool.query("ROLLBACK");
        await pool.end();
        await server.close();
    });

    it("Customer entry", async () => {
        const customer = {
            full_name: 'Kamala Perera',
            nic: '977746184V',
            email: 's1234@gmail.com',
            latitude: '6.9134329',
            longitude: "79.8785155",
            address: ' 28/1, Siriwardane Rd, Dehiwala',
            gender: 'Female',
            dob: '2000-02-10',
            contact_no: 116431164,
            "password": '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO'
        }
        const result = await Customer.enterCustomer(customer);
        expect(result).toBe(true);
    });
});