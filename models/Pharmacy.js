
const { pool } = require('../database/connection');

class Pharmacy{

    static getPharmacyInfo(pharmacyId) {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT pharmacy_id,name,address,email,contact_no,approved_state FROM pharmacy WHERE pharmacy_id = ?',
                [pharmacyId],
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    //send pharmacy information for the customers
    static getPharmacyInformation(pharmacyName){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT name,address,email,contact_no FROM pharmacy WHERE name = ?',
            [pharmacyName],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                console.log(results);
                resolve(results);
            }
        )
        })
    }

    static getPendingPharmacies(){
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT pharmacy_id,name,address,longitude,latitude,email,contact_no,approved_state FROM pharmacy WHERE approved_state = ?',
                ['Not Approved'],
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    static enterPharmacy(pharmacy) {
        return new Promise((resolve, reject) => {
            const result = pool.query("INSERT INTO pharmacy(`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES (?,?,?,?,?,?,?)",
                [
                    pharmacy.name,
                    pharmacy.address,
                    pharmacy.longitude,
                    pharmacy.latitude,
                    pharmacy.email,
                    pharmacy.contact_no,
                    pharmacy.password
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(result.sql);
                        reject(error);
                        return;
                    }
                    resolve(console.log("Done"));
                }
            )
        })
    }
    static setApprovalState(approvalState,pharmacyId){
        return new Promise((resolve, reject) =>{
            const result = pool.query('UPDATE pharmacy SET approved_state = ? WHERE pharmacy_id = ?',
                [approvalState,pharmacyId],
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    // Pasindu
    // Start----------------------------------------------------------------------
    
    static getCustomerInfo(request_id) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query("SELECT customer_id, full_name, email, address, gender, contact_no FROM customer WHERE customer_id = (SELECT customer_id FROM requests WHERE request_id = ?)", [request_id], (err, rows, fields) => {
                if (err) { reject(err); }
                resolve(rows);
            });
        });
    }
    
    static getRequestedDrugTypes(request_id) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query("SELECT drug_type_id, drug_type_name FROM drug_type WHERE drug_type_id IN (SELECT drug_type_id FROM requests_and_associated_drug_types WHERE request_id = ?)", [request_id], (err, rows, fields) => {
                if (err) { reject(err); }
                resolve(rows);
            });
        });
    }
    
    static getRequestedBrandedDrugs(request_id) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query("SELECT branded_drug_id, brand_name FROM branded_drug WHERE branded_drug_id IN (SELECT branded_drug_id FROM requests_and_associated_branded_drugs WHERE request_id = ?)", [request_id], (err, rows, fields) => {
                if (err) { reject(err); }
                resolve(rows);
            });
        });
    }

    static storeInResponse(response_id, request_id, pharmacy_id) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query("INSERT INTO response VALUES (?, ?)",[request_id, pharmacy_id], (err, results, fields) => {
                if (err) { reject(err); }
                resolve("Response table updated...");
            });
        });
    }
    
    static storeAcceptedDrugTypes(response_id, drug_type_ids) {
        return new Promise ((resolve, reject) => {
            if (typeof(drug_type_ids) === "undefined") {
                resolve("No drug types...");
            } else if (typeof(drug_type_ids) === "string") {
                mysqlConnection.query("INSERT INTO responses_and_associated_drug_types VALUES (?, ?)", [response_id, parseInt(drug_type_ids)], (err, results, fields) => {
                    if (err) { reject(err); }
                    resolve("One drug type...");
                });
            } else {
                drug_type_ids.forEach(function(id){
                    mysqlConnection.query("INSERT INTO responses_and_associated_drug_types VALUES (?, ?)", [response_id, parseInt(id)], (err, results, fields) => {
                        if (err) { reject(err); }
                        resolve("Multiple drug types...");
                    });
                });
            }
        });
    }
    
    static storeAcceptedBrandedDrugs(response_id, branded_drug_ids) {
        return new Promise ((resolve, reject) => {
            if (typeof(branded_drug_ids) === "undefined") {
                resolve("No branded drugs...")
            } else if (typeof(branded_drug_ids) === "string") {
                mysqlConnection.query("INSERT INTO responses_and_associated_branded_drugs VALUES (?, ?)", [response_id, parseInt(branded_drug_ids)], (err, results, fields) => {
                    if (err) { reject(err); }
                    resolve("One branded drug...");
                });
            } else {
                branded_drug_ids.forEach(function(id){
                    mysqlConnection.query("INSERT INTO responses_and_associated_branded_drugs VALUES (?, ?)", [response_id, parseInt(id)], (err, results, fields) => {
                        if (err) { reject(err); }
                        resolve("Multiple branded drugs...");
                    });
                });
            }
        });
    }

    static getRespondedDrugTypes(response_id) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query("SELECT DISTINCT(drug_type_id) FROM response NATURAL JOIN responses_and_associated_drug_types WHERE response_id = ?", [response_id], (err, rows, fields) => {
                if (err) { reject(err); }
                resolve(rows);
            });
        });
    }
    
    static getRespondedBrandedDrugs(response_id) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query("SELECT DISTINCT(branded_drug_id) FROM response NATURAL JOIN responses_and_associated_branded_drugs WHERE response_id = ?", [response_id], (err, rows, fields) => {
                if (err) { reject(err); }
                resolve(rows);
            });
        });
    }

    static deletePreviousRespone(response_id) {
        return new Promise ((resolve, reject) => {
            mysqlConnection.query("DELETE FROM response WHERE response_id = ?", [response_id], (err, rows, fields) => {
                if (err) { reject(err); }
                resolve("Deleted the previous response...");
            });
        });
    }
    // End----------------------------------------------------------------------
}
module.exports = Pharmacy;