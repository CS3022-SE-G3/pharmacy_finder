const {
    pool
} = require('../database/connection');


class SystemAdmin {

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
                        //console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve();
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
                        //console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve();
                }
            )
        })
    }

    /**
     * @description Get all branded drugs from the database
     */
    static getAllDrugs() {
        return new Promise((resolve, reject) => {
            const query = pool.query("SELECT branded_drug_id,brand_name,manufacturer,drug_type_id FROM branded_drug WHERE is_deleted = ? ORDER BY brand_name",
                [false],
                function (error, results, fields) {
                    if (error) {
                        //console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(results);
                }
            )
        })
    }

    /**
     * @description Get all drug types from database
     * 
     */
    static getAllDrugTypes() {
        return new Promise((resolve, reject) => {
            const query = pool.query("SELECT drug_type_id, drug_type_name FROM drug_type WHERE is_deleted = ? ORDER BY drug_type_name",
                [false],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        console.log(error);
                        reject(error);
                        return;
                    };
                    resolve(results);
                }
            )
        })
    }

    /**
     * @description Get a drug type using drug_type_id from database
     * 
     */
    static getDrugType(drug_type_id) {
        return new Promise((resolve, reject) => {
            const query = pool.query("SELECT drug_type_id, drug_type_name FROM drug_type WHERE drug_type_id = ? AND is_deleted = ?",
                [drug_type_id, false],
                function (error, results, fields) {
                    if (error) {
                        console.log(query.sql);
                        console.log(error);
                        reject(error);
                        return;
                    };
                    resolve(results[0]); //only 1st record is returned
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
                        //console.log(query.sql);
                        //console.log(error.message);
                        reject(error);
                        return;
                    };
                    resolve();
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
                        //console.log(query.sql);
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
                        //console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(results);
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
                        //console.log(query.sql);
                        reject(error);
                        return;
                    };
                    resolve(results);
                }
            )
        })
    }

    /**
     *  
     *  @description - getting customer infromation from database from accountID
     *  @param {number} accountId - customerId
     */
    static async getCustomerAccountInformation(accountId) {

        try {
            const response = await new Promise((resolve, reject) => {
                // if query succces we gonna resolve the result
                // else we gonna reject it
                const qry = "SELECT full_name,nic,email,address,gender,dob,contact_no FROM customer WHERE customer_id=?"; // query
                pool.query(qry, [accountId], (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    // else
                    console.log(res)
                    resolve(res);
                })
            })

            return response;

        } catch (error) {
            console.log(error)
        }
    }

    /**
     *  
     *  @description - getting customer infromation from database from accountID
     *  @todo delete report
     */
    static async getReportedPharmaciesInformation() {

        try {
            const response = await new Promise((resolve, reject) => {
                // if query succces we gonna resolve the result
                // else we gonna reject it
                const qry = "SELECT `pharmacy_id`,`customer_id`,`reasons`,`address`,`longitude`,`latitude`,`email`,`contact_no` FROM `reported_pharmacies` NATURAL JOIN `pharmacy`"; // query
                pool.query(qry, (err, res) => {
                    if (err) {
                        // testing - pass
                        console.log(err)
                        reject(new Error(err.message));
                    }
                    // else
                    // testing -pass
                    // console.log('qry reault')
                    // console.log(res)
                    resolve(res);
                })
            })

            // testing - pass
            // console.log(`response to view reported pharamcy qry `)
            // console.log(response)
            return response;

        } catch (error) {
            console.log(error)
            return (error)
        }
    }

    static getSysAdminInfo(username) {
        return new Promise((resolve, reject) => {
            const result = pool.query('SELECT * FROM system_admin WHERE username = ?',
                [username],
                function (error, results) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                    resolve(results);
                }
            )
        })
    }

    /**
     *  
     *  @description - delete record of reported paharamcy
     *  @param {number} accountId - customerId
     *  @param {number} pharamacyId - pharamacy Id
     */
    static async deleteRecord(pharamacyId, accountId) {

        try {
            const response = await new Promise((resolve, reject) => {
                // if query succces we gonna resolve the result
                // else we gonna reject it
                const qry = "DELETE FROM reported_pharmacies WHERE pharmacy_id=? AND customer_id=?"; // query
                pool.query(qry, [pharamacyId, accountId], (err, res) => {
                    if (err) {
                        reject(new Error(err.message));
                    }
                    // else
                    console.log(res)
                    resolve(res);
                })
            })

            return response;

        } catch (error) {
            console.log(error)
        }
    }

    /**
     *  
     *  @description - getting pharmacy is in the reported pharmacy list
     *  @param {number} accountId - customerId
     *  @param {number} pharamacyId - pharmacy Id
     *  
     */
    static async getReportedPharmacyInformation(pharmacyID, customerID) {

        return new Promise((resolve, reject) => {

            const qry = "SELECT `pharmacy_id`,`customer_id`,`reasons` FROM `reported_pharmacies` WHERE pharmacy_id=? AND customer_id=?"; // query

            const result = pool.query(qry, [pharmacyID, customerID], (err, res) => {
                if (err) {
                    console.log(result.sql);
                    console.log(err)
                    reject(new Error(err.message));
                }

                resolve(res.length > 0);
            })
        })

        // testing - pass
        return response;

    }

    /**
     *  
     *  @description - deleting pharmacy account
     *  @param {number} pharamacyId - pharmacy Id
     *  
     */
    static async deleteAccount(pharamacyId) {

        return new Promise((resolve, reject) => {
            // if query succces we gonna resolve the result
            // else we gonna reject it
            const qry = "DELETE FROM `pharmacy` WHERE pharmacy_id=?"; // query
            pool.query(qry, [pharamacyId], (err, res) => {
                if (err) {
                    // testing - pass
                    console.log("error in deleting pharmacy from database when deleting a reported pharmacy");
                    console.log(err)
                    reject(false); //returns false if error
                }
                // else
                // testing -pass
                console.log
                resolve(true);
            })
        })


    }

}

module.exports = SystemAdmin;