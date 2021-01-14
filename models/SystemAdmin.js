const { pool } = require('../database/connection');


class SystemAdmin{

    /**
     * @description Add a branded drug to the database
     */
    static enterDrug(drug) {
        return new Promise((resolve, reject) => {
            const query = pool.query("INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES (?,?,?)",
                [
                    drug.brand_name,
                    drug.manufacturer,
                    drug.drug_type_id
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

    /**
     * @description Add a drug type to the database
     */
    static enterDrugType(drug) {
        return new Promise((resolve, reject) => {
            const query = pool.query("INSERT INTO drug_type(`drug_type_name`) VALUES (?)",
                [
                    drug.drug_type_name
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

    /**
     * @description Get all branded drugs from the database
     */
    static getAllDrugs() { 
        return new Promise((resolve, reject) => {
            const query = pool.query("SELECT branded_drug_id,brand_name,manufacturer,drug_type_id FROM branded_drug WHERE is_deleted = ?",
                [false],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        reject(error);
                        return;
                    };
                    console.log(results);
                    resolve(results);
                }
            )
        })
    }

    /**
     * @description Get all drug types from database
     * @todo Add 'is_deleted' to drug_type table
     */
    static getAllDrugTypes() {
        return new Promise((resolve, reject) => {
            const query = pool.query("SELECT drug_type_name FROM drug_type",
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        console.log(error);
                        reject(error);
                        return;
                    };
                    console.log(results);
                    resolve(results);
                }
            )
        })
    }

    /**
     * @description Update a branded drug's details in the database
     */
    static updateDrug(drug) {
        return new Promise((resolve, reject) => {
            const query = pool.query("UPDATE branded_drug SET brand_name = ?, manufacturer = ?, drug_type_id = ? WHERE branded_drug_id = ?",
                [
                    drug.brand_name,
                    drug.manufacturer,
                    drug.drug_type_id,
                    drug.branded_drug_id
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

    /**
     * @description Update a drug type's details in the database
     */
    static updateDrugType(drug) {
        return new Promise((resolve, reject) => {
            const query = pool.query("UPDATE drug_type SET drug_type_name = ? WHERE drug_type_id = ?",
                [
                    drug.drug_type_name,
                    drug.drug_type_id
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

    /**
     * @description Delete a branded drug from the database
     */
    static deleteDrug(drug) {
        return new Promise((resolve, reject) => {
            const query = pool.query("UPDATE branded_drug SET is_deleted = ? WHERE branded_drug_id = ?",
                [
                    true,
                    drug.branded_drug_id
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

    /**
     * @description Delete a drug type from the database
     * @todo Add 'is_deleted' to drug_type table
     */
    static deleteDrugType(drug) {
        return new Promise((resolve, reject) => {
            const query = pool.query("UPDATE drug_type SET is_deleted = ? WHERE drug_type_id = ?",
                [
                    true,
                    drug.drug_type_id
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

}

module.exports = SystemAdmin;