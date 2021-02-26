const c = require('config');
const {
    addNewDrug,
    viewAllDrugs,
    viewAddDrugForm,
    viewUpdateDrugForm,
    updateDrugDetails,
    viewDeleteDrugPrompt,
    deleteDrug
} = require('../../../controllers/system_admin/drug');
const { pool } = require('../../../database/connection');
let server;


describe('/system_admin/drug test cases', () => {
    beforeEach(async () => {
        server = require('../../../index');
        await pool.query("SET autocommit = OFF;");
        await pool.query("BEGIN;");
    });

    afterEach(async () => {
        await pool.query("ROLLBACK;");
        //await pool.end();
        await server.close();

    });

    const res = {
        status: jest.fn(() => res),
        render: jest.fn(),
        send: jest.fn(),
        redirect: jest.fn()
    };

    describe('addNewDrug', () => {
        it("should return status code 400 if any attribute of the drug is falsy", async () => {

            let falsyValueSets = [{
                brand_name: null, //fault
                drug_type_id: 40001,
                manufacturer: "test manufacturer"
            },
            {
                brand_name: "test name",
                drug_type_id: null, //fault
                manufacturer: "test manufacturer"
            },
            {
                brand_name: "test name",
                drug_type_id: 40001,
                manufacturer: null //fault
            },
            {
                brand_name: "test name",
                drug_type_id: "ss", //fault
                manufacturer: "test manufacturer"
            }];

            falsyValueSets.forEach(await checkSet);

            async function checkSet(item, index, arr) {
                let req = { body: item };
                await addNewDrug(req, res);
                expect(res.status).toHaveBeenLastCalledWith(400);
            }
        });

        it("should return status code 500 if drug_type_id doesn't exist in the database", async () => {
            let drug_type_id = 39999;
            let req = { body: "" };
            req.body = {
                brand_name: "test name",
                drug_type_id: drug_type_id, //fault
                manufacturer: "test manufacturer"
            };

            const result = await addNewDrug(req, res);

            expect(res.status).toHaveBeenLastCalledWith(500);
            expect(res.render).toHaveBeenLastCalledWith("500", { "err_data": "Internal server error ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`pharmacy_finder`.`branded_drug`, CONSTRAINT `branded_drug_ibfk_1` FOREIGN KEY (`drug_type_id`) REFERENCES `drug_type` (`drug_type_id`) ON DELETE CASCADE ON UPDATE CASCADE)" });

        });

        it("should return status code 500 if brand_name already exists in the database", async () => {
            let brand_name = "test unique";
            let req = { body: "" };
            req.body = {
                brand_name: brand_name, //fault
                drug_type_id: 40001,
                manufacturer: "test manufacturer"
            };

            //add dummy value
            await pool.query("INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES (?,?,?);",
                [req.body.brand_name,
                req.body.manufacturer,
                req.body.drug_type_id]
            )

            const result = await addNewDrug(req, res);

            expect(res.status).toHaveBeenLastCalledWith(500);
            expect(res.render).toBeCalled(); //TODO: expect error message to have "unique"
        });

        it("should return status code 200 if a drug is added to the database", async () => {
            let req = {
                body: {
                    brand_name: "test brand",
                    drug_type_id: 40001,
                    manufacturer: "test manufacturer"
                }
            }
            const result = await addNewDrug(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);

            const result2 = await pool.query("SELECT * FROM branded_drug WHERE brand_name = ?;",
                [req.body.brand_name]
            );

            expect(result2[0]).not.toBeNull();
        });
    });

    describe('viewAllDrugs', () => {
        let req = {};

        it("should return status code 200 and a list of drugs from the database", async () => {
            const expectedDrugs = [ //TODO: too specific. generalize!
                {
                    branded_drug_id: 50005,
                    brand_name: 'Amlogard 10',
                    manufacturer: 'Pfizer',
                    drug_type_id: 40002
                },
                {
                    branded_drug_id: 50003,
                    brand_name: 'ATROLET F 10MG TAB',
                    manufacturer: 'Roche',
                    drug_type_id: 40001
                },
                {
                    branded_drug_id: 50004,
                    brand_name: 'GENXVAST F TAB',
                    manufacturer: 'GlaxoSmithKline',
                    drug_type_id: 40001
                },
                {
                    branded_drug_id: 50002,
                    brand_name: 'OZOVAS F TAB',
                    manufacturer: 'Azure drugs PLC',
                    drug_type_id: 40001
                },
                {
                    branded_drug_id: 50006,
                    brand_name: 'Panadol',
                    manufacturer: 'GSK',
                    drug_type_id: 40003
                },
                {
                    branded_drug_id: 50001,
                    brand_name: 'TONACT TG 10MG TAB',
                    manufacturer: 'Star Drugs PLC',
                    drug_type_id: 40001
                },
                {
                    branded_drug_id: 50007,
                    brand_name: 'Tylenol',
                    manufacturer: 'McNeil Consumer Healthcare',
                    drug_type_id: 40003
                },
                {
                    branded_drug_id: 50009,
                    brand_name: 'Verelan',
                    manufacturer: 'Pfizer',
                    drug_type_id: 40004
                },
                {
                    branded_drug_id: 50008,
                    brand_name: 'Verelan PM',
                    manufacturer: 'McNeil Consumer Healthcare',
                    drug_type_id: 40004
                }
            ]
            const result = await viewAllDrugs(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith(
                'system_admin/drugs',
                {
                    drugs: expectedDrugs,
                    pageTitle: 'Drugs'
                })

        });

        // it("should return status code 500 if database is not properly connected", async () => { //TODO: clarify

        // });
    });

    describe('viewAddDrugForm', () => {

        it("should return status code 200 and render the update drug form with a list of drug types from the database", async () => {
            const drugTypes = [
                {
                    "drug_type_id": 40002,
                    "drug_type_name": "Amlodipine 10mg",
                },
                {
                    "drug_type_id": 40001,
                    "drug_type_name": "Atorvastatin 10mg + Fenofibrate 160mg",
                },
                {
                    "drug_type_id": 40003,
                    "drug_type_name": "Paracetamol",
                },
                {
                    "drug_type_id": 40004,
                    "drug_type_name": "Verapamil",
                },
            ];
            const req = {}

            await viewAddDrugForm(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith('system_admin/add_drug_form', {
                drugTypes: drugTypes,
                pageTitle: 'Add New Branded Drug'
            });
        });

        // it("should return status code 500 if database is not properly connected", async () => { //TODO: clarify

        // });
    });

    describe('viewUpdateDrugForm', () => {

        it("should return status code 200 and render the update drug form with a list of drug types from the database", async () => {
            const drugTypes = [
                {
                    "drug_type_id": 40002,
                    "drug_type_name": "Amlodipine 10mg",
                },
                {
                    "drug_type_id": 40001,
                    "drug_type_name": "Atorvastatin 10mg + Fenofibrate 160mg",
                },
                {
                    "drug_type_id": 40003,
                    "drug_type_name": "Paracetamol",
                },
                {
                    "drug_type_id": 40004,
                    "drug_type_name": "Verapamil",
                },
            ];
            let req = {
                params: {
                    branded_drug_id: 50001,
                    brand_name: "TONACT TG 10MG TAB",
                    manufacturer: "Star Drugs PLC",
                    drug_type_id: 40001
                }
            }

            const drug = {
                branded_drug_id: req.params.branded_drug_id,
                brand_name: req.params.brand_name,
                manufacturer: req.params.manufacturer,
                drug_type_id: req.params.drug_type_id
            };

            await viewUpdateDrugForm(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith('system_admin/update_drug_form', {
                drug: drug,
                drugTypes: drugTypes,
                pageTitle: 'Update Branded Drug Info'
            });
        });
    });

    describe('updateDrugDetails', () => {

        it("should return status code 400 if any attribute of the drug is falsy", async () => {
            let falsyValueSets = [{
                branded_drug_id: 50001,
                brand_name: null, //fault
                drug_type_id: 40001,
                manufacturer: "test manufacturer"
            },
            {
                branded_drug_id: 50001,
                brand_name: "test name",
                drug_type_id: null, //fault
                manufacturer: "test manufacturer"
            },
            {
                branded_drug_id: 50001,
                brand_name: "test name",
                drug_type_id: 40001,
                manufacturer: null //fault
            },
            {
                branded_drug_id: 50001,
                brand_name: "test name",
                drug_type_id: "ss", //fault
                manufacturer: "test manufacturer"
            },
            {
                branded_drug_id: null, //fault
                brand_name: "test name",
                drug_type_id: 40001,
                manufacturer: "test manufacturer"
            },
            {
                branded_drug_id: "ss", //fault
                brand_name: "test name",
                drug_type_id: 40001,
                manufacturer: "test manufacturer"
            }];

            falsyValueSets.forEach(await checkSet);

            async function checkSet(item, index, arr) {
                let req = { body: item };
                await updateDrugDetails(req, res);
                expect(res.status).toHaveBeenLastCalledWith(400);
            }
        });

        it("should return status code 500 if drug_type_id doesn't exist in the database", async () => {
            let drug_type_id = 39999;
            let req = { body: "" };
            req.body = {
                branded_drug_id: 50001,
                brand_name: "test name",
                drug_type_id: drug_type_id, //fault
                manufacturer: "test manufacturer"
            };

            const result = await updateDrugDetails(req, res);

            expect(res.status).toHaveBeenLastCalledWith(500);
            expect(res.render).toHaveBeenLastCalledWith("500", { "err_data": "Internal server error ER_NO_REFERENCED_ROW_2: Cannot add or update a child row: a foreign key constraint fails (`pharmacy_finder`.`branded_drug`, CONSTRAINT `branded_drug_ibfk_1` FOREIGN KEY (`drug_type_id`) REFERENCES `drug_type` (`drug_type_id`) ON DELETE CASCADE ON UPDATE CASCADE)" });
        });

        it("should return status code 500 if brand_name already exists in the database", async () => {
            let brand_name = "OZOVAS F TAB";
            let req = { body: "" };
            req.body = {
                branded_drug_id: 50001,
                brand_name: brand_name, //fault
                drug_type_id: 40001,
                manufacturer: "test manufacturer"
            };

            const result = await updateDrugDetails(req, res);

            expect(res.status).toHaveBeenLastCalledWith(500);
            expect(res.render).toHaveBeenLastCalledWith("500",
                {
                    "err_data": "Internal server error ER_DUP_ENTRY: Duplicate entry 'OZOVAS F TAB' for key 'branded_drug.brand_name'"
                }); //TODO: expect error message to have "unique"
        });

        it("should return status code 200 if a drug is updated in the database", async () => {
            let req = {
                body: {
                    branded_drug_id: 50001,
                    brand_name: "test brand",
                    drug_type_id: 40001,
                    manufacturer: "test manufacturer"
                }
            }
            const result = await updateDrugDetails(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);

            const result2 = await pool.query("SELECT * FROM branded_drug WHERE branded_drug_id = ?;",
                [req.body.branded_drug_id]
            );

            expect(result2[0]).not.toBeNull();
        });
    });

    describe('viewDeleteDrugPrompt', () => {

        it("should return status code 200 and render the delete drug prompt", async () => {

            let req = {
                params: {
                    branded_drug_id: 50001
                }
            };

            await viewDeleteDrugPrompt(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith('system_admin/delete_drug_prompt', {
                branded_drug_id: req.params.branded_drug_id,
                pageTitle: 'Delete Branded Drug'
            });

        });
    });

    describe('deleteDrug', () => {

        it("should return status code 500 if branded_drug_id is not in the database", async () => {
            let branded_drug_id = 49999;
            let req = { body: "" };
            req.body = {
                branded_drug_id: branded_drug_id,
            };

            const result = await deleteDrug(req, res);

            expect(res.status).toHaveBeenLastCalledWith(500);
            expect(res.render).toHaveBeenLastCalledWith("500", { "err_data": "Invalid request: invalid branded_Drug_id" });
        });

        it("should return status code 200 if drug's is_deleted is updated to be true", async () => {
            let branded_drug_id = 50001;
            let req = { body: "" };
            req.body = {
                branded_drug_id: branded_drug_id,
            };

            const result = await deleteDrug(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);

            const result2 = await pool.query("SELECT * FROM branded_drug WHERE branded_drug_id = ?, is_deleted = ?;",
                [
                    req.body.branded_drug_id,
                    true
                ]
            );

            expect(result2[0]).not.toBeNull();
        });
    });

});