const {getPharmacyDrugs, deletePharmacyDrugs} = require('../../../controllers/pharmacy/drug');
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
                {
                  drug_type_id: 40015,
                  drug_type_name: 'Amlodipine 10mg'
                },
                {
                  drug_type_id: 40014,
                  drug_type_name: 'Atorvastatin 10mg + Fenofibrate 160mg'
                },
                { drug_type_id: 40016, drug_type_name: 'Paracetamol' }
              ];
            const brand = [
                { branded_drug_id: 50014, brand_name: 'Amlogard 10' },
                {
                  branded_drug_id: 50012,
                  brand_name: 'ATROLET F 10MG TAB'
                },
                {
                  branded_drug_id: 50013,
                  brand_name: 'GENXVAST F TAB'
                },
                { branded_drug_id: 50011, brand_name: 'OZOVAS F TAB' },
                { branded_drug_id: 50015, brand_name: 'Panadol' },
                {
                  branded_drug_id: 50010,
                  brand_name: 'TONACT TG 10MG TAB'
                },
                { branded_drug_id: 50016, brand_name: 'Tylenol' }
            ];

            await getPharmacyDrugs(request, response);

            expect(response.render).toHaveBeenCalledWith('pharmacy/drugList',{drug_types: drug, branded_drugs: brand});
        });
    });

    describe('deletePharmacyDrugs', () => {
        const request = {
            session: {user: {id: 100006}},
            body: {delete_drug_type: undefined, delete_branded_drug: 50016}
        };

        const response = {
            render:jest.fn(),
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
                {
                  drug_type_id: 40015,
                  drug_type_name: 'Amlodipine 10mg'
                },
                {
                  drug_type_id: 40014,
                  drug_type_name: 'Atorvastatin 10mg + Fenofibrate 160mg'
                },
                { drug_type_id: 40016, drug_type_name: 'Paracetamol' }
              ];
            const brand = [
                { branded_drug_id: 50014, brand_name: 'Amlogard 10' },
                {
                  branded_drug_id: 50012,
                  brand_name: 'ATROLET F 10MG TAB'
                },
                {
                  branded_drug_id: 50013,
                  brand_name: 'GENXVAST F TAB'
                },
                { branded_drug_id: 50011, brand_name: 'OZOVAS F TAB' },
                { branded_drug_id: 50015, brand_name: 'Panadol' },
                {
                  branded_drug_id: 50010,
                  brand_name: 'TONACT TG 10MG TAB'
                }
              ];

            deletePharmacyDrugs(request, response);
            await getPharmacyDrugs(request, response);

            expect(response.redirect).toHaveBeenCalledWith('/pharmacy/drug');
            expect(response.render).toHaveBeenCalledWith('pharmacy/drugList',{drug_types: drug, branded_drugs: brand});

        });
    });
});