const { pool } = require('../../database/connection');

function getAllDrugTypes() { //TODO: fix
    return new Promise((resolve, reject) => {
        const query = pool.query("SELECT drug_type_name FROM drug_type",
            function (error, results, fields) {
                if (error) {
                    console.log(query.sql);
                    reject(error);
                    return;
                };
                console.log(results);
                resolve(results[0]);
            }
        )
    })
}
exports.getAllDrugTypes = getAllDrugTypes;
