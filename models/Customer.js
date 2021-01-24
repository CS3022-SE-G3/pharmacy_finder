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
                        console.log(result.sql);
                        reject(error);
                        return;
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

    static sendRequest(drug_types, branded_drugs, pharmacies) {
        return new Promise((resolve, reject) => {
            const result = pool.query('SELECT pharmacy_id,name,address,email,contact_no,approved_state FROM pharmacy WHERE pharmacy_id = ?',
                [pharmacyId],
                function (error, results, fields) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                    pool.close();
                    resolve(results);
                }
            )
        })
    }


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
    
    static getDrugTypesFromRequest(requestID){
        try{
            return new Promise((resolve, reject) => {
                const result = pool.query(`(SELECT drug_type_id, drug_type_name FROM requests_and_associated_drug_types NATURAL JOIN drug_type WHERE request_id = ${requestID} )`,
                [],
                function (error, results) {
                    if (error) {
                        console.log(result.sql)
                        reject (error);
                    }
                    console.log(results);
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
                // 'SELECT request_id, drug_type_name, brand_name, manufacturer,drug_type_name FROM (SELECT * FROM branded_drug NATURAL JOIN requests_and_associated_branded_drugs) NATURAL JOIN drug_type AS A WHERE request_id=?'
                const result = pool.query(`SELECT branded_drug_id, brand_name,manufacturer, drug_type_name FROM (SELECT * FROM branded_drug NATURAL JOIN requests_and_associated_branded_drugs) AS A JOIN drug_type ON A.drug_type_id = drug_type.drug_type_id WHERE request_id=?`,
                    [requestID],
                    function (error, results) {
                        if (error) {
                            console.log(result.sql)
                            reject(error);
                        }
                        console.log(result.sql);
                        console.log(results);
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
                    console.log(results);
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
                        console.log(results);
                        resolve(results);
                    }
                )
            })
        } catch(error) {
            console.log(error)
        }
        
    }
    static getRespondedPharmacies(requestId) {
        console.log("Getting responded pharmacies");
            return new Promise((resolve, reject) => {
                const result = pool.query('SELECT pharmacy_id, name, address FROM (SELECT * FROM pharmacy NATURAL JOIN response) AS T WHERE approved_state=? AND request_id=?',
                    [
                        "Approved",
                        requestId
                    ],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                            reject(new Error(error.message));
                        }
                        console.log(results);
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
                        console.log(result.sql);
                        console.log(results[0].id);
                        resolve(results[0].id);
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
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query('INSERT INTO requests_and_associated_pharmacies (request_id,pharmacy_id) VALUES ?',
                    [pharmacies],
                    function (error, results) {
                        if (error) {
                            console.log(result.sql);
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

    //drug types
    static enterDrugTypes(drugTypes) {
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query('INSERT INTO requests_and_associated_drug_types  (request_id,drug_type_id) VALUES ?',
                    [drugTypes],
                    function (error, results) {
                        if (error) {
                            console.log(result.sql);

                            reject(new Error(error.message));
                        }
                        console.log(results);
                        resolve(results);
                    }
                )

            })
        } catch (error) {
            console.log(error)
        }
    }

    //branded drugs
    static enterBrandedDrugs(brandedDrugs) {
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query('INSERT INTO requests_and_associated_branded_drugs  (request_id,branded_drug_id) VALUES ?',
                    [brandedDrugs],
                    function (error, results) {
                        if (error) {
                            console.log(result.sql);

                            reject(new Error(error.message));
                        }
                        console.log(results);
                        resolve(results);
                    }
                )
            })
        } catch {
            console.log(error)
        }
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
                        console.log(results);
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
                        console.log(error);
                    }
                    console.log("Customer Location");
                    console.log(results);
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
        console.log("Getting profile details");
            return new Promise((resolve, reject) => {
                const result = pool.query('SELECT * FROM customer WHERE customer_id=?',
                    [customerId],
                    function (error, results) {
                        if (error) {
                            console.log(error);
                            reject(new Error(error.message));
                        }
                        console.log(results);
                        resolve(results);
                    }
                )
            }
            );
    }
    static editProfileDetails(customers) {
        console.log("Editing profile details");
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
                            console.log(error);
                            reject(new Error(error.message));
                        }
                        console.log('OK');
                        resolve(console.log("Done"));
                    }
                )
            }
            );
    }
    
    

}

module.exports = Customer;
