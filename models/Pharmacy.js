
const { request } = require('express');
const { pool } = require('../database/connection');

class Pharmacy{

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
                        reject(error);
                        return;
                    };
                    resolve();
                }
            )
        })
    }



    static getPharmacyInfo(pharmacyId) {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT pharmacy_id,name,address,email,contact_no,latitude,longitude,approved_state FROM pharmacy WHERE pharmacy_id = ?',
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

    static getDrugTypes(pharmacy_id) {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT drug_type_id,drug_type_name FROM drug_type WHERE drug_type_id NOT IN (SELECT drug_type_id FROM pharmacy_drug_types WHERE pharmacy_id = ?) ', [pharmacy_id],
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )

            
        } )
    }

    static getBrandedDrugs(pharmacy_id) {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT branded_drug_id,brand_name FROM branded_drug WHERE branded_drug_id NOT IN (SELECT branded_drug_id FROM pharmacy_branded_drugs WHERE pharmacy_id = ?)', [pharmacy_id],
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }
    
    static putPharmacyDrugTypes(pharmacy_id, data) {
        return new Promise((resolve, reject) => {
            const drug_types = data;
            
            for (var i = 0; i < drug_types.length; i++) {
                const drug_type_id = [parseInt(drug_types[i])];
                const result = pool.query('INSERT INTO pharmacy_drug_types(pharmacy_id,drug_type_id) VALUES(?,?)', [pharmacy_id, drug_type_id],
                
                    function (error, results, fields) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    })
            }
        }
        )
    }
                                   

    //send pharmacy information for the customers
    static getPharmacyInformation(pharmacyName){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT name,address,email,contact_no FROM pharmacy WHERE name = ?',
            [pharmacyName],
                function (error, results) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                }
                )
        }
        )
            
        }
    
    static putPharmacyBrandedDrugs(pharmacy_id,data) {
        return new Promise((resolve, reject) =>{
            const branded_drugs=data;

            for(var i=0; i<branded_drugs.length;i++){
                const branded_drug_id=[parseInt(branded_drugs[i])];
                const result = pool.query('INSERT INTO pharmacy_branded_drugs(pharmacy_id,branded_drug_id) VALUES(?,?)', [pharmacy_id, branded_drug_id],
                    
                    function (error, results, fields) {
                        if (error) {
                            reject (new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            }
        } )
    }


    static getPharmacyInfoByEmail(email){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT * FROM pharmacy WHERE email = ?',
            [email],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
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

    static getDrugTypesOfSelectedBrandedDrugs(data) {
        return new Promise((resolve, reject) =>{
            const branded_drug_id=data;
            const result = pool.query('SELECT drug_type_id FROM branded_drug WHERE branded_drug_id=?',branded_drug_id,
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }
      
    static getPharmacyDrugTypes(pharmacy_id) {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT drug_type.drug_type_id,drug_type_name FROM drug_type,pharmacy_drug_types WHERE drug_type.drug_type_id=pharmacy_drug_types.drug_type_id AND pharmacy_id = ? ORDER BY drug_type_name',[pharmacy_id],
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    static getPharmacyBrandedDrugs(pharmacy_id) {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT branded_drug.branded_drug_id,brand_name FROM branded_drug,pharmacy_branded_drugs WHERE branded_drug.branded_drug_id=pharmacy_branded_drugs.branded_drug_id AND pharmacy_id=? ORDER BY brand_name', [pharmacy_id],
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    static deletePharmacyDrugTypes(id,pharmacy_id) {
        return new Promise((resolve, reject) =>{
            const drug_type_id=[id];
            const result = pool.query('DELETE FROM pharmacy_drug_types WHERE drug_type_id=? AND pharmacy_id = ?', [drug_type_id, pharmacy_id],
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    static deletePharmacyBrandedDrugs(id, pharmacy_id) {
        return new Promise((resolve, reject) =>{
            const branded_drug_id=[id];
            const result = pool.query('DELETE FROM pharmacy_branded_drugs WHERE branded_drug_id=?', [branded_drug_id, pharmacy_id],
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }




    static async isEmailRegistered(email){
        var result = await new Promise((resolve,reject)=>{
            const result = pool.query('SELECT pharmacy_id FROM pharmacy WHERE email = ?',
            [email],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
        })

        return result.length != 0;
    }

    static async getRequests(pharmacy_id){
        var responded_requests = await new Promise((resolve,reject)=>{
            const result = pool.query('SELECT request_id, full_name AS customer_name, date_created FROM requests NATURAL JOIN customer WHERE request_id IN (SELECT request_id FROM response WHERE pharmacy_id = ?); ',
            [pharmacy_id],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
        })

        var requests = await new Promise((resolve,reject)=>{
            const result = pool.query('SELECT request_id, full_name AS customer_name, date_created FROM requests NATURAL JOIN customer WHERE request_id IN (SELECT request_id FROM requests_and_associated_pharmacies WHERE request_id NOT IN (SELECT request_id FROM response WHERE pharmacy_id = ?) AND pharmacy_id = ?); ',
            [pharmacy_id, pharmacy_id],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
        })

        return [responded_requests, requests];
    }

    static async getPharmacyInfoByID(pharmacy_id){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT pharmacy_id, name, address, longitude, latitude, email, contact_no FROM pharmacy WHERE pharmacy_id = ?',
            [pharmacy_id],
            function (error, results) {
                if (error) {
                    reject (new Error(error.message));
                }
                resolve(results);
            }
        )
        })
    }
    

    static getCustomerInfo(request_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT customer_id, full_name, email, address, gender, contact_no FROM customer WHERE customer_id = (SELECT customer_id FROM requests WHERE request_id = ?)", [request_id], (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }
    static deletePreviousRespone(response_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("DELETE FROM response WHERE response_id = ?", [response_id], (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve("Deleted the previous response...");
            });
        });
    }

    static storeAcceptedBrandedDrugs(response_id, branded_drug_ids) {
        return new Promise((resolve, reject) => {
            if (typeof (branded_drug_ids) === "undefined") {
                resolve("No branded drugs...")
            } else if (typeof (branded_drug_ids) === "string") {
                const result = pool.query("INSERT INTO responses_and_associated_branded_drugs VALUES (?, ?)", [response_id, parseInt(branded_drug_ids)], (err, results, fields) => {
                    if (err) {
                        reject(err);
                    }
                    resolve("One branded drug...");
                });
            } else {
                branded_drug_ids.forEach(function (id) {
                    const result = pool.query("INSERT INTO responses_and_associated_branded_drugs VALUES (?, ?)", [response_id, parseInt(id)], (err, results, fields) => {
                        if (err) {
                            reject(err);
                        }
                        resolve("Multiple branded drugs...");
                    });
                });
            }
        });
    }

    static storeAcceptedDrugTypes(response_id, drug_type_ids) {
        return new Promise((resolve, reject) => {
            if (typeof (drug_type_ids) === "undefined") {
                resolve("No drug types...");
            } else if (typeof (drug_type_ids) === "string") {
                const result = pool.query("INSERT INTO responses_and_associated_drug_types VALUES (?, ?)", [response_id, parseInt(drug_type_ids)], (err, results, fields) => {
                    if (err) {
                        reject(err);
                    }
                    resolve("One drug type...");
                });
            } else {
                drug_type_ids.forEach(function (id) {
                    const result = pool.query("INSERT INTO responses_and_associated_drug_types VALUES (?, ?)", [response_id, parseInt(id)], (err, results, fields) => {
                        if (err) {
                            reject(err);
                        }
                        resolve("Multiple drug types...");
                    });
                });
            }
        });
    }

    static getRespondedDrugTypes(response_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT DISTINCT(drug_type_id) FROM responses_and_associated_drug_types WHERE response_id = ?", [response_id], (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static storeInResponse(request_id, pharmacy_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("INSERT INTO response(request_id, pharmacy_id, date_created) VALUES (?, ?, CURDATE())", [request_id, pharmacy_id], (err, results, fields) => {
                if (err) {
                    reject(err);
                }
                resolve("Response table updated...");
            });
        });
    }

    static getRespondedBrandedDrugs(response_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT DISTINCT(branded_drug_id) FROM responses_and_associated_branded_drugs WHERE response_id = ?", [response_id], (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static getRequestedDrugTypes(request_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT drug_type_id, drug_type_name FROM drug_type WHERE drug_type_id IN (SELECT drug_type_id FROM requests_and_associated_drug_types WHERE request_id = ?)", [request_id], (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static getRequestedBrandedDrugs(request_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT branded_drug_id, brand_name FROM branded_drug WHERE branded_drug_id IN (SELECT branded_drug_id FROM requests_and_associated_branded_drugs WHERE request_id = ?)", [request_id], (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }

    static getResponseID(pharmacy_id, request_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT response_id FROM response WHERE pharmacy_id = ? AND request_id = ?", [pharmacy_id, request_id], (err, rows, fields) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
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


}

module.exports = Pharmacy;
