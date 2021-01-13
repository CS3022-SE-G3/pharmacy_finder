const { pool } = require('../../database/connection');
const Joi = require('joi');

function validatePharmacyId(pharmacyId){
    const schema = Joi.object({
        "pharmacyId"    : Joi.number().integer().min(10001).required(),
    });
    return schema.validate(pharmacyId)
}

function getPharmacyInfo(pharmacyId) {
    return new Promise((resolve, reject) =>{
        const result = pool.query('SELECT pharmacy_id,name,address,email,contact_no,approved_state FROM Pharmacy WHERE pharmacy_id = ?',
            [pharmacyId],
            function (error, results, fields) {
                if (error) {
                    console.log(result.sql);
                    reject(error);
                    return;
                }
                console.log(results);
                resolve(results);
            }
        )
    } )
}

const view_pharmacy_info = async(req,res)=>{
    const pharmacyId = req.params.pharmacyid;
    const {error} = validatePharmacyId({pharmacyIdId:pharmacyId});
    if (error) {
        console.error('ValidationError:pharmacy-pharmacy_id: '+error.details[0].message)
        res.status(400).send("Invalid Account ID provided");
        res.end();
        return;
    }

    const pharmacyInfo = await getPharmacyInfo(pharmacyId);
    try{
        if (!pharmacyInfo){
            return res.status(404).send("Could not find pharmacy info");
        }
        res.status(200).json({message: 'Pharmacy information fetched.',pharmacyInfo:pharmacyInfo});
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }

};


exports.view_pharmacy_info = view_pharmacy_info;