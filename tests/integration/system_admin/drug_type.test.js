const c = require('config');
const {
    addNewDrugType,
    viewAllDrugTypes,
    viewDrugType,
    viewAddDrugTypeForm,
    updateDrugTypeDetails,
    viewUpdateDrugTypeForm,
    viewDeleteDrugTypePrompt,
    deleteDrugType
} = require('../../../controllers/system_admin/drug_type');
const { pool } = require('../../../database/connection');
let server;

describe('/system_admin/drug_type test cases', () => {
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

    describe('addNewDrugType', () => {
        it("should return status code 400 if any attribute of the drug type is falsy", async () => {

            let falsyValueSets = [{
                drug_type_name: null //fault              
            }];

            falsyValueSets.forEach(await checkSet);

            async function checkSet(item, index, arr) {
                let req = { body: item };
                await addNewDrugType(req, res);
                expect(res.status).toHaveBeenLastCalledWith(400);
            }
        });


        it("should return status code 500 if drug_type_name already exists in the database", async () => {
            let drug_type_name = "test unique";
            let req = { body: "" };
            req.body = {
                drug_type_name: drug_type_name //fault
            };

            //add dummy value
            await pool.query("INSERT INTO drug_type(`drug_type_name`) VALUES (?);",
                [
                    req.body.drug_type_name
                ]
            )

            const result = await addNewDrugType(req, res);

            expect(res.status).toHaveBeenLastCalledWith(500);
            expect(res.render).toBeCalled(); //TODO: expect error message to have "unique"
        });

        it("should return status code 200 if a drug type is added to the database", async () => {
            let req = {
                body: {
                    drug_type_name: "test add"
                }
            }
            const result = await addNewDrugType(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);

            const result2 = await pool.query("SELECT * FROM drug_type WHERE drug_type_name = ?;",
                [req.body.drug_type_name]
            );

            expect(result2[0]).not.toBeNull();
        });
    });

    describe('viewAllDrugTypes', () => {
        let req = {};

        it("should return status code 200 and a list of drug types from the database", async () => {
            const expectedDrugTypes = [ //TODO: too specific. generalize!
                {
                    "drug_type_id": 40002,
                    "drug_type_name": "Amlodipine 10mg"
                },
                {
                    "drug_type_id": 40001,
                    "drug_type_name": "Atorvastatin 10mg + Fenofibrate 160mg"
                },
                {
                    "drug_type_id": 40003,
                    "drug_type_name": "Paracetamol"
                },
                {
                    "drug_type_id": 40004,
                    "drug_type_name": "Verapamil"
                }
            ]

            const result = await viewAllDrugTypes(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith(
                'system_admin/drug_types',
                {
                    "drugTypes": expectedDrugTypes,
                    "pageTitle": "Drug Types"
                })

        });

        // it("should return status code 500 if database is not properly connected", async () => { //TODO: clarify

        // });
    });

    describe('viewDrugType', () => {
        let req = {
            params: {
                drug_type_id: 40002
            }
        };

        it("should return status code 200 and the drug type from the database and render the drug type page", async () => {
            const expectedDrugType =  //TODO: too specific. generalize!
            {
                "drug_type_id": 40002,
                "drug_type_name": "Amlodipine 10mg"
            }


            const result = await viewDrugType(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith(
                'system_admin/drug_type', {
                drug_type: expectedDrugType,
                pageTitle: 'Drug Type'
            })

        });

        // it("should return status code 500 if database is not properly connected", async () => { //TODO: clarify

        // });
    });

    describe('viewAddDrugTypeForm', () => {

        it("should return status code 200 and render the update drug form ", async () => {
            const req = {}

            await viewAddDrugTypeForm(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith('system_admin/add_drug_type_form', {
                pageTitle: 'Add New Drug Type'
            });
        });

        // it("should return status code 500 if database is not properly connected", async () => { //TODO: clarify

        // });
    });

    describe('updateDrugTypeDetails', () => {

        it("should return status code 400 if any attribute of the drug type is falsy", async () => {
            let falsyValueSets = [{
                drug_type_name: null //fault              
            }];

            falsyValueSets.forEach(await checkSet);

            async function checkSet(item, index, arr) {
                let req = { body: item };
                await updateDrugTypeDetails(req, res);
                expect(res.status).toHaveBeenLastCalledWith(400);
            }
        });

        it("should return status code 500 if drug_type_name already exists in the database", async () => {
            let drug_type_name = "Paracetamol";
            let req = { body: "" };
            req.body = {
                drug_type_id: 40001,
                drug_type_name: drug_type_name //fault
            };

            const result = await updateDrugTypeDetails(req, res);

            expect(res.status).toHaveBeenLastCalledWith(500);
            expect(res.render).toHaveBeenLastCalledWith("500",
                {
                    "err_data": "Internal server error ER_DUP_ENTRY: Duplicate entry 'Paracetamol' for key 'drug_type.drug_type_name'"
                }); //TODO: expect error message to have "unique"
        });

        it("should return status code 200 if a drug type is updated in the database", async () => {
            let req = {
                body: {
                    drug_type_id: 40001,
                    drug_type_name: "test update" //fault
                }
            }
            const result = await updateDrugTypeDetails(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);

            const result2 = await pool.query("SELECT * FROM drug_type WHERE drug_type_name = ?;",
                [req.body.drug_type_name]
            );

            expect(result2[0]).not.toBeNull();
        });
    });

    describe('viewUpdateDrugTypeForm', () => {

        it("should return status code 200 and render the update drug type form", async () => {

            let req = {
                params: {
                    drug_type_id: 40001,
                    drug_type_name: "Atorvastatin 10mg + Fenofibrate 160mg"
                }
            }

            const drugType = {
                drug_type_id: req.params.drug_type_id,
                drug_type_name: req.params.drug_type_name
            };

            await viewUpdateDrugTypeForm(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith('system_admin/update_drug_type_form', {
                drugType: drugType,
                pageTitle: 'Update Drug Type Info'
            });
        });
    });

    describe('viewDeleteDrugTypePrompt', () => {

        it("should return status code 200 and render the delete drug type prompt", async () => {

            let req = {
                params: {
                    drug_type_id: 40001
                }
            };

            await viewDeleteDrugTypePrompt(req, res);

            expect(res.status).toHaveBeenLastCalledWith(200);
            expect(res.render).toHaveBeenLastCalledWith('system_admin/delete_drug_type_prompt', {
                drug_type_id: req.params.drug_type_id,
                pageTitle: 'Delete Drug Type'
            });

        });
    });

    describe('deleteDrugType', () => {

        it("should return status code 500 if drug_type_id is not in the database", async () => {
            let drug_type_id = 39999;
            let req = { body: "" };
            req.body = {
                drug_type_id: drug_type_id,
            };

            const result = await deleteDrugType(req, res);

            expect(res.status).toHaveBeenLastCalledWith(500);
            expect(res.render).toHaveBeenLastCalledWith("500",
                {
                    "err_data": "Invalid request: invalid drug_type_id"
                });
        });

        // it("should return status code 200 if drug's is_deleted is updated to be true", async () => {
        //     let branded_drug_id = 50001;
        //     let req = { body: "" };
        //     req.body = {
        //         branded_drug_id: branded_drug_id,
        //     };

        //     const result = await deleteDrug(req, res);

        //     expect(res.status).toHaveBeenLastCalledWith(200);

        //     const result2 = await pool.query("SELECT * FROM branded_drug WHERE branded_drug_id = ?, is_deleted = ?;",
        //         [
        //             req.body.branded_drug_id,
        //             true
        //         ]
        //     );

        //     expect(result2[0]).not.toBeNull();
        // });
    });
});