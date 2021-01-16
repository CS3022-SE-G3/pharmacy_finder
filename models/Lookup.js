const { pool } = require('../database/connection');

class Lookup{

    static lookupEmail(email) {
        {
            return new Promise((resolve, reject) => {
                const result = pool.query('SELECT * FROM customer WHERE `email` = ?',
                    [email],
                    function (error, results, fields) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            })
        }
    }

    static getDate() {
        const date = new Date();
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        const today = year + "-" + month + "-" + day;
        return today;
    }

    /**
     * 
     * @todo implementation of algorithm
     */
    static lookupPharmacies(customerLocation, tempBrandedDrugs, tempDrugTypes) {
        
    }
}

module.exports = Lookup;