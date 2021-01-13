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

    static getPendingPharmacies(){
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT pharmacy_id,name,address,email,contact_no FROM pharmacy WHERE approved_state = ?',
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

}

module.exports = Pharmacy;