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
    
}

module.exports = Customer;