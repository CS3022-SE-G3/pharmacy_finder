const { pool } = require('../database/connection');

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
}

module.exports = Customer;