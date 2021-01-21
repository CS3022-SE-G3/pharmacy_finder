
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

    static getDrugTypes() {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT drug_type_id,drug_type_name FROM drug_type WHERE drug_type_id NOT IN (SELECT drug_type_id FROM pharmacy_drug_types) ',
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )

            
        } )
    }

    static getBrandedDrugs() {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT branded_drug_id,brand_name FROM branded_drug WHERE branded_drug_id NOT IN (SELECT branded_drug_id FROM pharmacy_branded_drugs)',
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }
// **************** I used 30001 for pharmacy_id as a default value ****************
    static putPharmacyDrugTypes(data) {
        return new Promise((resolve, reject) => {
            const drug_types = data;
            
            for (var i = 0; i < drug_types.length; i++) {
                const drug_type_id = [parseInt(drug_types[i])];
                const result = pool.query('INSERT INTO pharmacy_drug_types(pharmacy_id,drug_type_id) VALUES(30001,?)', drug_type_id,
                
                    function (error, results, fields) {
                        if (error) {
                            reject(new Error(error.message));
                        }
                        resolve(results);
                    })
            }
        }
        )
    }
                                   

    //send pharmacy information for the customers
    static getPharmacyInformation(pharmacyName){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT name,address,email,contact_no FROM pharmacy WHERE name = ?',
            [pharmacyName],
                function (error, results) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                }
                )
        }
        )
            
        }
    
// **************** I used 30001 for pharmacy_id as a default value ****************
    static putPharmacyBrandedDrugs(data) {
        return new Promise((resolve, reject) =>{
            const branded_drugs=data;

            for(var i=0; i<branded_drugs.length;i++){
                const branded_drug_id=[parseInt(branded_drugs[i])];
                const result = pool.query('INSERT INTO pharmacy_branded_drugs(pharmacy_id,branded_drug_id) VALUES(30001,?)',branded_drug_id,
                    
                    function (error, results, fields) {
                        if (error) {
                            reject (new Error(error.message));
                        }
                        resolve(results);
                    }
                )
            }
        } )
    }


    static getPharmacyInfoByEmail(email){
        return new Promise((resolve,reject)=>{
            const result = pool.query('SELECT * FROM pharmacy WHERE email = ?',
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
      
    static getPharmacyDrugTypes() {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT drug_type.drug_type_id,drug_type_name FROM drug_type,pharmacy_drug_types WHERE drug_type.drug_type_id=pharmacy_drug_types.drug_type_id',
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    static getPharmacyBrandedDrugs() {
        return new Promise((resolve, reject) =>{
            const result = pool.query('SELECT branded_drug.branded_drug_id,brand_name FROM branded_drug,pharmacy_branded_drugs WHERE branded_drug.branded_drug_id=pharmacy_branded_drugs.branded_drug_id',
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    static deletePharmacyDrugTypes(id) {
        return new Promise((resolve, reject) =>{
            const drug_type_id=[id];
            const result = pool.query('DELETE FROM pharmacy_drug_types WHERE drug_type_id=?',drug_type_id,
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }

    static deletePharmacyBrandedDrugs(id) {
        return new Promise((resolve, reject) =>{
            const branded_drug_id=[id];
            const result = pool.query('DELETE FROM pharmacy_branded_drugs WHERE branded_drug_id=?',branded_drug_id,
                
                function (error, results, fields) {
                    if (error) {
                        reject (new Error(error.message));
                    }
                    resolve(results);
                }
            )
        } )
    }




    static async isEmailRegistered(email){
        var result = await new Promise((resolve,reject)=>{
            const result = pool.query('SELECT pharmacy_id FROM pharmacy WHERE email = ?',
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

}

module.exports = Pharmacy;
