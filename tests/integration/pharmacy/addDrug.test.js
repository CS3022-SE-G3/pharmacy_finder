const {getPharmacyDrugs, updatePharmacyDrugs} = require('../../../controllers/pharmacy/addDrug');
const { pool } = require('../../../database/connection');
let server;

describe('pharmacy/drug teste cases', () => {

    describe('getPharmacyDrugs', () => {
        const request = {
            session: {user: {id: 100006}}
        };

        const response = {
            render: jest.fn()
        };

        beforeEach(() => {
            server = require('../../../index');
        });
    
        afterEach(async () => {
            await server.close();
    
        });
    
        it('should return 200 with pharmacy drug data',async  () => {
            const drug = [
                { drug_type_id: 40018, drug_type_name: 'test1' },
                { drug_type_id: 40020, drug_type_name: 'test2' },
                { drug_type_id: 40023, drug_type_name: 'test3' },
                { drug_type_id: 40017, drug_type_name: 'Verapamil' }
              ];
            const brand = [
                { branded_drug_id: 50019, brand_name: 'test1' },
                { branded_drug_id: 50034, brand_name: 'test10' },
                { branded_drug_id: 50035, brand_name: 'test11' },
                { branded_drug_id: 50036, brand_name: 'test12' },
                { branded_drug_id: 50038, brand_name: 'test13' },
                { branded_drug_id: 50040, brand_name: 'test14' },
                { branded_drug_id: 50020, brand_name: 'test2' },
                { branded_drug_id: 50021, brand_name: 'test3' },
                { branded_drug_id: 50022, brand_name: 'test4' },
                { branded_drug_id: 50023, brand_name: 'test5' },
                { branded_drug_id: 50027, brand_name: 'test6' },
                { branded_drug_id: 50024, brand_name: 'test7' },
                { branded_drug_id: 50028, brand_name: 'test8' },
                { branded_drug_id: 50033, brand_name: 'test9' },
                { branded_drug_id: 50018, brand_name: 'Verelan' },
                { branded_drug_id: 50017, brand_name: 'Verelan PM' }
              ];

            await getPharmacyDrugs(request, response);

            expect(response.render).toHaveBeenCalledWith('pharmacy/addDrugPage',{drug_types: drug, branded_drugs: brand});
        });
    });

    describe('updatePharmacyDrugs', () => {
        const request = {
            session: {user: {id: 100006}},
            body: { '40017': '40017', '50017': '50017' }
        };

        const response = {
            render: jest.fn(),
            redirect: jest.fn()
        };

        beforeEach(async () => {
            server = require('../../../index');
            await pool.query("SET autocommit = OFF");
            await pool.query("BEGIN");
        });
    
        afterEach(async () => {
            await pool.query("ROLLBACK");
            await pool.end();
            await server.close();
        });
    
        it('should return 200 with newly updated pharmacy drug data',async () => {
            const drug = [
                { drug_type_id: 40018, drug_type_name: 'test1' },
                { drug_type_id: 40020, drug_type_name: 'test2' },
                { drug_type_id: 40023, drug_type_name: 'test3' }
              ];
            const brand = [
                { branded_drug_id: 50019, brand_name: 'test1' },
                { branded_drug_id: 50034, brand_name: 'test10' },
                { branded_drug_id: 50035, brand_name: 'test11' },
                { branded_drug_id: 50036, brand_name: 'test12' },
                { branded_drug_id: 50038, brand_name: 'test13' },
                { branded_drug_id: 50040, brand_name: 'test14' },
                { branded_drug_id: 50020, brand_name: 'test2' },
                { branded_drug_id: 50021, brand_name: 'test3' },
                { branded_drug_id: 50022, brand_name: 'test4' },
                { branded_drug_id: 50023, brand_name: 'test5' },
                { branded_drug_id: 50027, brand_name: 'test6' },
                { branded_drug_id: 50024, brand_name: 'test7' },
                { branded_drug_id: 50028, brand_name: 'test8' },
                { branded_drug_id: 50033, brand_name: 'test9' },
                { branded_drug_id: 50018, brand_name: 'Verelan' }
              ];

            updatePharmacyDrugs(request, response);
            await getPharmacyDrugs(request, response);

            expect(response.redirect).toHaveBeenCalledWith('/pharmacy/addDrug');
            expect(response.render).toHaveBeenCalledWith('pharmacy/addDrugPage',{drug_types: drug, branded_drugs: brand});

        });
    });
});