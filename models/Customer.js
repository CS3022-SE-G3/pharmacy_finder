const { pool } = require('../database/connection');
const Lookup = require('./Lookup');
class Customer{

    static enterCustomer(customer) {
        return new Promise((resolve, reject) => {
            const result = pool.query("INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`gender`,`dob`,`contact_no`,`password`) VALUES (?,?,?,?,?,?,?,?)",
                [
                    customer.full_name,
                    customer.nic,
                    customer.email,
                    customer.address,
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
    static getBroadcastedRequests(customerId){
        try{
            return new Promise((resolve,reject)=>{
                const result = pool.query('SELECT request_id, drug_type_name, brand_name, manufacturer FROM (SELECT * FROM drug_type NATURAL JOIN (SELECT * FROM branded_drug NATURAL JOIN (SELECT * FROM requests_and_associated_pharmacies NATURAL JOIN (SELECT * FROM requests NATURAL JOIN requests_and_associated_branded_drugs) AS T) AS T) AS T) AS T WHERE customer_id= ?',
                [customerId],
                function (error, results) {
                    if (error) {
                        reject (new Error(error.message));
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

    static enterRequest(customerID) {
        try {
            return new Promise((resolve, reject) => {
                const result = pool.query('SELECT insert_request (?,?) AS id',
                    [customerID, Lookup.getDate()],
                    function (error, results) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        console.log(results[0].id);
                        resolve(results[0].id);
                    }
                )
            })
        } catch {
            console.log(error)
        }
        
    }
    //pharmacies
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
        } catch {
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

    static getLocation(customerID) {
        const customerLocation = [];
        /**
         * @todo Get live location or look up the address in the table and convert it to latitude and longitude
         */

        return customerLocation;
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
}

module.exports = Customer;