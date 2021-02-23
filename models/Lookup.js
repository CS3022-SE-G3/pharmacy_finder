const { pool } = require('../database/connection');

class Lookup{
    static getDate() {
        const date = new Date();
        let day = ("0" + date.getDate()).slice(-2);
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        let year = date.getFullYear();
        const today = year + "-" + month + "-" + day;
        return today;
    }

    // ===========================================USE CASE: BROADCAST REQUEST OF CUSTOMER===============================================


    static lookupPharmaciesForDrugs(tempBrandedDrugs, tempDrugTypes) {

        let query;
        if(tempBrandedDrugs.length>0 && tempDrugTypes.length>0)
        {
            if (typeof tempBrandedDrugs === 'string' || tempBrandedDrugs instanceof String)
            {
                //1 branded drug, 1 drug type
                if (typeof tempDrugTypes === 'string' || tempDrugTypes instanceof String)
                {
                    query = `SELECT DISTINCT pharmacy_id FROM (SELECT pharmacy_id FROM pharmacy_branded_drugs WHERE branded_drug_id = ${tempBrandedDrugs} UNION SELECT pharmacy_id FROM pharmacy_drug_types WHERE drug_type_id = ${tempDrugTypes}) AS A`;
                } else
                {
                //1 branded drug, multiple drug types
                    query = `SELECT DISTINCT pharmacy_id FROM (SELECT pharmacy_id FROM pharmacy_branded_drugs WHERE branded_drug_id = ${tempBrandedDrugs} UNION SELECT pharmacy_id FROM pharmacy_drug_types WHERE drug_type_id IN (` + tempDrugTypes.join() + `)) AS A`;
                }
            }
            else
            {
                //multiple branded drugs, 1 drug type
                if (typeof tempDrugTypes === 'string' || tempDrugTypes instanceof String)
                {
                    query = `SELECT DISTINCT pharmacy_id FROM (SELECT pharmacy_id FROM pharmacy_branded_drugs WHERE branded_drug_id IN (` + tempBrandedDrugs.join() + `) UNION SELECT pharmacy_id FROM pharmacy_drug_types WHERE drug_type_id  = ${tempDrugTypes}) AS A`;
                }
                else
                {

                //multiple branded drugs, multiple drug types
                    query = `SELECT DISTINCT pharmacy_id FROM (SELECT pharmacy_id FROM pharmacy_branded_drugs WHERE branded_drug_id IN (` + tempBrandedDrugs.join() + `) UNION SELECT pharmacy_id FROM pharmacy_drug_types WHERE drug_type_id IN (` + tempDrugTypes.join() + `)) AS A`;
                }
            }
        }
        //no branded drugs, only drug types
        else if (tempBrandedDrugs.length == 0)
        {
            //1 drug type only
            if (typeof tempDrugTypes === 'string' || tempDrugTypes instanceof String) {
                query = `SELECT DISTINCT pharmacy_id FROM pharmacy_drug_types WHERE drug_type_id = ${tempDrugTypes}`;
            } else {
                // multiple drug types
                query = `SELECT DISTINCT pharmacy_id FROM pharmacy_drug_types WHERE drug_type_id IN (` + tempDrugTypes.join() + `)`;
            }
            
        }
        //no drug types, only branded drugs
        else if (tempDrugTypes.length == 0) {
            //1 branded drug
            if (typeof tempBrandedDrugs === 'string' || tempBrandedDrugs instanceof String)
            {
                query = `SELECT DISTINCT pharmacy_id FROM pharmacy_branded_drugs WHERE branded_drug_id = ${tempBrandedDrugs}`;
            }
            else
            {
                // multiple branded drugs
                query = `SELECT DISTINCT pharmacy_id FROM pharmacy_branded_drugs WHERE branded_drug_id IN (` + tempBrandedDrugs.join() + `)`;
            }
        }
        
        return new Promise((resolve, reject) => {
            const result = pool.query(query,
                [],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                        return;
                    };
                    resolve(results);
                }
            )
        });
    }

    static lookupPharmacies(left, right, up, down,pharmacies) {

        const query = `SELECT pharmacy_id FROM pharmacy WHERE (latitude <= ? AND latitude>= ?) AND (longitude >=  ? AND longitude <= ?) AND (approved_state ="Approved") AND (pharmacy_id IN (` + pharmacies.join() + `))`;
        return new Promise((resolve, reject) => {
            const result = pool.query(query,
                [up,down,left,right],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                        return;
                    };
                    resolve(results);
                }
            )
        });
    }


}

module.exports = Lookup;