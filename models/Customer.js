const config = require('config');
const { pool } = require('../database/connection');
const Lookup = require('./Lookup');
class Customer{

    static enterCustomer(customer) {
        return new Promise((resolve, reject) => {
            const result = pool.query("INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES (?,?,?,?,?,?,?,?,?,?)",
                [
                    customer.full_name,
                    customer.nic,
                    customer.email,
                    customer.address,
                    customer.latitude,
                    customer.longitude,
                    customer.gender,
                    customer.dob,
                    customer.contact_no,
                    customer.password
                ],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                        return;
                    };
                    resolve(true);
                }
            )
        })
    }


    static getPharmacyInformation(pharmacyName){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT pharmacy_id,name,address,email,contact_no FROM pharmacy WHERE name = ?',
            [pharmacyName],
                function (error, results) {
                    if (error) {
                    reject (new Error(error.message));
                    }
                resolve(results);
            }
        )
        })
    }

    static reportPharmacy(pharmacy_id, customer_id, reasons) {
        return new Promise((resolve, reject) => {
            const result = pool.query('INSERT INTO reported_pharmacies VALUES (?,?,?)',
                [pharmacy_id, customer_id, reasons],
                function (error, results) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                    resolve(results);
                }
            )
        })
    }


    
    static getDrugTypesFromRequest(requestID){
        try{
            return new Promise((resolve, reject) => {
                const result = pool.query(`(SELECT drug_type_id, drug_type_name FROM requests_and_associated_drug_types NATURAL JOIN drug_type WHERE request_id = ${requestID} )`,
                [],
                function (error, results) {
                    if (error) {
                        reject (error);
                    }
                    resolve(results);
                }
                )
            })
        }catch{
            console.log(error)
        }
                
            
    }

    static getBrandedDrugsFromRequest(requestID) {
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query(`SELECT branded_drug_id, brand_name,manufacturer, drug_type_name FROM (SELECT * FROM branded_drug NATURAL JOIN requests_and_associated_branded_drugs) AS A JOIN drug_type ON A.drug_type_id = drug_type.drug_type_id WHERE request_id=?`,
                    [requestID],
                    function (error, results) {
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    }
                )
            })
        } catch {
            console.log(error)
        }


    }
    static getAllRequests(customerId){
        try{
            return new Promise((resolve,reject)=>{
                const result = pool.query('SELECT request_id,  date_created FROM requests WHERE customer_id=?',
                [customerId],
                function (error, results) {
                    if (error) {
                        reject (error);
                    }
                    resolve(results);
                }
                )
            })
        }catch(error){
            console.log(error)
        }
    }

    static deleteRequest(requestID) {
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query('DELETE FROM requests WHERE request_id=?',
                    [requestID],
                    function (error, results) {
                        if (error) {
                            reject(error);
                        }
                        resolve(results);
                    }
                )
            })
        } catch(error) {
            console.log(error)
        }
    }
    static getRespondedPharmacies(requestId) {
            return new Promise((resolve, reject) => {
                const result = pool.query('SELECT pharmacy_id, name, address FROM (SELECT * FROM pharmacy NATURAL JOIN response) AS T WHERE approved_state=? AND request_id=?',
                    [
                        "Approved",
                        requestId
                    ],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            }
            );
    }

    static enterRequestPart1() {
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query('SELECT request_id+1 AS id FROM requests ORDER BY request_id desc LIMIT 1',
                    [],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        if (!results || results.length==0) {
                            return resolve(60001);
                        }
                        else {
                            resolve(results[0].id);
                        }
                    }
                )
            })
        } catch {
            console.log(error)
        }
    }
    
    static enterRequestPart2(requestID, customerID) {
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query('INSERT INTO requests (request_id, customer_id, date_created) VALUES (?, ?, ?);',
                    [requestID, customerID, Lookup.getDate()],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(true);
                    }
                )
            })
        } catch {
            console.log(error)
        }
    }

    static enterPharmacies(pharmacies) {
            return new Promise((resolve, reject) => {
                const result = pool.query('INSERT INTO requests_and_associated_pharmacies (request_id,pharmacy_id) VALUES ?',
                    [pharmacies],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            })
        } 

    //drug types
    static enterDrugTypes(drugTypes) {
            return new Promise((resolve, reject) => {
                const result = pool.query('INSERT INTO requests_and_associated_drug_types  (request_id,drug_type_id) VALUES ?',
                    [drugTypes],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            })
        } 

    //branded drugs
    static enterBrandedDrugs(brandedDrugs) {
            return new Promise((resolve, reject) => {
                const result = pool.query('INSERT INTO requests_and_associated_branded_drugs  (request_id,branded_drug_id) VALUES ?',
                    [brandedDrugs],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            })
    }

    static getBroadcastedRequests(customerId) {
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query('SELECT request_id, drug_type_name, brand_name, manufacturer FROM (SELECT * FROM drug_type NATURAL JOIN (SELECT * FROM branded_drug NATURAL JOIN (SELECT * FROM requests_and_associated_pharmacies NATURAL JOIN (SELECT * FROM requests NATURAL JOIN requests_and_associated_branded_drugs) AS T) AS T) AS T) AS T WHERE customer_id= ?',
                    [customerId],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            })
        } catch {
            console.log(error)
        }
    }

    static getLocation(customerID) {
        return new Promise((resolve, reject) => {
            const result = pool.query('SELECT latitude, longitude FROM customer WHERE customer_id = ?',
                [customerID],
                function (error, results) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                    resolve(results[0]);
                }
            )
        })
    }

    static getCustomerInfoByEmail(email){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT * FROM customer WHERE email = ?',
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

    static async isEmailRegistered(email){
        var result = await new Promise((resolve,reject)=>{
            const result = pool.query('SELECT customer_id FROM customer WHERE email = ?',
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

    //profile
    static getProfileDetails(customerId) {
            return new Promise((resolve, reject) => {
                const result = pool.query('SELECT * FROM customer WHERE customer_id=?',
                    [customerId],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            }
            );
    }
    static editProfileDetails(customers) {
            return new Promise((resolve, reject) => {
                const result = pool.query('UPDATE `customer` SET `full_name`=?,`nic`=?,`email`=?,`address`=?,`latitude`=?,`longitude`=?,`gender`=?,`dob`=?,`contact_no`=? WHERE customer_id=?;',
                [
                    customers.full_name,
                    customers.nic,
                    customers.email,
                    customers.address,
                    customers.latitude,
                    customers.longitude,
                    customers.gender,
                    customers.dob,
                    customers.contact_no,
                    customers.customer_id
                ],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve();
                    }
                )
            }
            );
    }
    
    

}

module.exports = Customer;
