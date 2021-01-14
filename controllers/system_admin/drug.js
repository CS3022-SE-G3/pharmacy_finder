
const { pool } = require('../../database/connection');
const Joi = require('joi');

function validateAddDrugDetails(drug) {
    const schema = Joi.object({
        "brand_name"  : Joi.string().required(),
        "manufacturer": Joi.string().required(),
        "drug_type_id": Joi.number().integer().required()
    });
    
    return schema.validate(drug);
}

function validateUpdateDrugDetails(drug) {
    const schema = Joi.object({
        "branded_drug_id"   : Joi.number().integer().required(),
        "brand_name"        : Joi.string().required(),
        "manufacturer"      : Joi.string().required(),
        "drug_type_id"      : Joi.number().integer().required()
    });
    
    return schema.validate(drug);
}

function getAllDrugs() { //TODO: fix
    return new Promise((resolve, reject) => {
        const query = pool.query("SELECT branded_drug_id,brand_name,manufacturer,drug_type_id FROM branded_drug WHERE is_deleted = ?",
            [false],
            function (error, results, fields) {
                if (error) {
                    console.log(query.sql);
                    reject(error);
                    return;
                };
                resolve(results);
            }
        )
    })
}

function enterDrug(drug) {
    return new Promise((resolve, reject) => {
        const query = pool.query("INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES (?,?,?)",
            [
                drug.brand_name,
                drug.manufacturer,
                drug.drug_type_id
            ],
            function (error, results, fields) {
                if (error) {
                    console.log(query.sql);
                    reject(error);
                    return;
                };
                resolve(console.log("Done"));
            }
        )
    })
}

function updateDrug(drug) {
    return new Promise((resolve, reject) => {
        const query = pool.query("UPDATE branded_drug SET brand_name = ?, manufacturer = ?, drug_type_id = ? WHERE branded_drug_id = ?",
            [
                drug.brand_name,
                drug.manufacturer,
                drug.drug_type_id,
                drug.branded_drug_id
            ],
            function (error, results, fields) {
                if (error) {
                    console.log(query.sql);
                    reject(error);
                    return;
                };
                resolve(console.log("Done"));
            }
        )
    })
}

function deleteDrug(drug) {
    return new Promise((resolve, reject) => {
        const query = pool.query("UPDATE branded_drug SET is_deleted = ? WHERE branded_drug_id = ?",
            [
                true,
                drug.drug_type_id
            ],
            function (error, results, fields) {
                if (error) {
                    console.log(query.sql);
                    reject(error);
                    return;
                };
                resolve(console.log("Done"));
            }
        )
    })
}

exports.getAllDrugs = getAllDrugs;
exports.validateAddDrugDetails = validateAddDrugDetails;
exports.validateUpdateDrugDetails = validateUpdateDrugDetails;
exports.enterDrug = enterDrug;
exports.updateDrug = updateDrug;
exports.deleteDrug = deleteDrug;

