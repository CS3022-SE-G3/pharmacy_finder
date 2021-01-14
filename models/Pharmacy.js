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
        try{
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
        }catch{
            console.log(error)
        }
        
    
    }

}

module.exports = Pharmacy;
