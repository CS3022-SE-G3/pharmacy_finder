
const { pool } = require('../database/connection');

class Pharmacy{

    static getPharmacyInfo(pharmacyId) {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT pharmacy_id,name,address,longitude,latitude,email,contact_no,approved_state FROM pharmacy WHERE pharmacy_id = ?',
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
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

}
module.exports = Pharmacy;