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

module.exports = Pharmacy;